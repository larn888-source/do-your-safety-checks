import SwiftUI

struct PaywallView: View {
  @EnvironmentObject var shop: Shop

  var body: some View {
    ZStack {
      Color(red: 11 / 255, green: 18 / 255, blue: 32 / 255).ignoresSafeArea()
      VStack(spacing: 18) {
        Text("DO YOUR SAFETY CHECKS")
          .font(.caption.weight(.bold))
          .tracking(1.6)
          .foregroundStyle(Color(red: 61 / 255, green: 139 / 255, blue: 253 / 255))
        Text("Your 30-day trial has ended")
          .font(.title2.bold())
          .multilineTextAlignment(.center)
          .foregroundStyle(.white)
        Text("Unlock the app once for \(shop.product?.displayPrice ?? "£0.99"). This is a lifetime purchase, not a subscription.")
          .font(.body)
          .multilineTextAlignment(.center)
          .foregroundStyle(Color(red: 154 / 255, green: 168 / 255, blue: 195 / 255))
          .padding(.horizontal)

        Button {
          Task { await shop.buy() }
        } label: {
          Text(shop.busy ? "Please wait…" : "Buy for life \(shop.product?.displayPrice ?? "£0.99")")
            .font(.headline)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
        }
        .background(Color(red: 31 / 255, green: 157 / 255, blue: 85 / 255))
        .foregroundStyle(.white)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .disabled(shop.busy)

        Button("Restore purchase") {
          Task { await shop.restore() }
        }
        .foregroundStyle(.white)

        if !shop.message.isEmpty {
          Text(shop.message)
            .font(.footnote)
            .multilineTextAlignment(.center)
            .foregroundStyle(Color(red: 255 / 255, green: 214 / 255, blue: 214 / 255))
        }
      }
      .padding(24)
    }
  }
}

struct RootView: View {
  @EnvironmentObject var shop: Shop

  var body: some View {
    ZStack(alignment: .top) {
      if shop.unlocked {
        WebView()
          .ignoresSafeArea()
      } else {
        PaywallView()
      }
      if shop.trialActive && !shop.purchased {
        Text("Trial: \(shop.trialDaysLeft) day\(shop.trialDaysLeft == 1 ? "" : "s") left")
          .font(.caption.weight(.bold))
          .padding(.horizontal, 12)
          .padding(.vertical, 6)
          .background(.black.opacity(0.55))
          .clipShape(Capsule())
          .foregroundStyle(.white)
          .padding(.top, 8)
      }
    }
    .preferredColorScheme(.dark)
  }
}
