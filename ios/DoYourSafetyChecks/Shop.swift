import Foundation
import StoreKit

@MainActor
final class Shop: ObservableObject {
  static let productID = "com.doyoursafetychecks.app.lifetime"

  @Published var purchased = false
  @Published var product: Product?
  @Published var message = ""
  @Published var busy = false

  func load() async {
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
}
