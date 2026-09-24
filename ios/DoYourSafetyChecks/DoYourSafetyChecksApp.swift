import SwiftUI

@main
struct DoYourSafetyChecksApp: App {
  @StateObject private var shop = Shop()

  var body: some Scene {
    WindowGroup {
      RootView()
        .environmentObject(shop)
        .task { await shop.load() }
    }
  }
}
