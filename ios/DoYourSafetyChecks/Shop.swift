import Foundation
import StoreKit

@MainActor
final class Shop: ObservableObject {
  static let productID = "com.doyoursafetychecks.app.lifetime"
  static let trialDays = 30
  private static let firstOpenKey = "dysc.firstOpen"

  @Published var purchased = false
  @Published var product: Product?
  @Published var message = ""
  @Published var busy = false

  var trialDaysLeft: Int {
    let start = firstOpenDate()
    let end = Calendar.current.date(byAdding: .day, value: Self.trialDays, to: start) ?? start
    let days = Calendar.current.dateComponents([.day], from: Date(), to: end).day ?? 0
    return max(0, days)
  }

  var trialActive: Bool {
    trialDaysLeft > 0
  }

  var unlocked: Bool {
    purchased || trialActive
  }

  func load() async {
    recordFirstOpenIfNeeded()
    await refreshPurchase()
    await loadProduct()
    await listenForTransactions()
  }

  func buy() async {
    guard let product else {
      message = "The £0.99 unlock is not available yet. It will work after the app is on the App Store."
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

  private func firstOpenDate() -> Date {
    if let saved = UserDefaults.standard.object(forKey: Self.firstOpenKey) as? Date {
      return saved
    }
    let now = Date()
    UserDefaults.standard.set(now, forKey: Self.firstOpenKey)
    return now
  }

  private func recordFirstOpenIfNeeded() {
    _ = firstOpenDate()
  }
}
