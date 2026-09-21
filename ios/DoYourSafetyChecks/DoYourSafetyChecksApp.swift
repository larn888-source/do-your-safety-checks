import SwiftUI

@main
struct DoYourSafetyChecksApp: App {
  var body: some Scene {
    WindowGroup {
      WebView()
        .ignoresSafeArea()
        .preferredColorScheme(.dark)
        .statusBarHidden(false)
    }
  }
}
