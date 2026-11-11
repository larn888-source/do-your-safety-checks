import Foundation
import StoreKit

@MainActor
final class Shop: ObservableObject {
  static let productID = "com.doyoursafetychecks.app.lifetime"
  static let trialDays = 30
  static let priceLabel = "£3.99"
  private let firstOpenKey = "dysc.firstOpen"

  @Published var purchased = false
  @Published var product: Product?
  @Published var message = ""
  @Published var busy = false
  @Published var trialDaysLeft = trialDays

  var priceText: String {
    product?.displayPrice ?? Self.priceLabel
  }

  func load() async {
    rememberFirstOpen()
    refreshTrial()
    await refreshPurchase()
    await loadProduct()
    await listenForTransactions()
  }

  func refreshTrial() {
    let started = Date(timeIntervalSince1970: UserDefaults.standard.double(forKey: firstOpenKey))
    let ends = Calendar.current.date(byAdding: .day, value: Self.trialDays, to: started) ?? started
    let remaining = ends.timeIntervalSinceNow
    if remaining <= 0 {
      trialDaysLeft = 0
    } else {
      trialDaysLeft = max(1, Int(ceil(remaining / 86_400)))
    }
  }

  func buy() async {
    guard let product else {
      message = "The unlock could not be loaded. Check your connection and try again."
      return
    }
    busy = true
    message = ""
    defer { busy = false }
    do {
      let result = try await product.purchase()
      switch result {
      case .success(let verification):
        let transaction = try check(verification)
        await transaction.finish()
        purchased = true
      case .userCancelled:
        break
      case .pending:
        message = "Purchase is pending."
      @unknown default:
        break
      }
    } catch {
      message = error.localizedDescription
    }
  }

  func restore() async {
    busy = true
    message = ""
    defer { busy = false }
    do {
      try await AppStore.sync()
      await refreshPurchase()
      if !purchased {
        message = "No lifetime purchase found for this Apple ID."
      }
    } catch {
      message = error.localizedDescription
    }
  }

  private func rememberFirstOpen() {
    guard UserDefaults.standard.object(forKey: firstOpenKey) == nil else { return }
    UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: firstOpenKey)
  }

  private func loadProduct() async {
    do {
      let products = try await Product.products(for: [Self.productID])
      product = products.first
    } catch {
      message = ""
    }
  }

  private func refreshPurchase() async {
    for await entitlement in Transaction.currentEntitlements {
      if let transaction = try? check(entitlement), transaction.productID == Self.productID {
        purchased = true
        return
      }
    }
    purchased = false
  }

  private func listenForTransactions() async {
    Task {
      for await update in Transaction.updates {
        if let transaction = try? check(update), transaction.productID == Self.productID {
          await transaction.finish()
          purchased = true
        }
      }
    }
  }

  private func check(_ result: VerificationResult<Transaction>) throws -> Transaction {
    switch result {
    case .unverified(_, let error):
      throw error
    case .verified(let transaction):
      return transaction
    }
  }
}
