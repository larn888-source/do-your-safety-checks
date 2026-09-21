import SwiftUI
import WebKit
import UIKit

struct WebView: UIViewRepresentable {
  func makeCoordinator() -> Coordinator {
    Coordinator()
  }

  func makeUIView(context: Context) -> WKWebView {
    let config = WKWebViewConfiguration()
    config.allowsInlineMediaPlayback = true
    config.mediaTypesRequiringUserActionForPlayback = []
    config.defaultWebpagePreferences.allowsContentJavaScript = true
    config.preferences.javaScriptCanOpenWindowsAutomatically = true
    config.setURLSchemeHandler(context.coordinator, forURLScheme: "dysc")

    let userController = WKUserContentController()
    userController.add(context.coordinator, name: "nativeApp")
    config.userContentController = userController

    let webView = WKWebView(frame: .zero, configuration: config)
    webView.navigationDelegate = context.coordinator
    webView.uiDelegate = context.coordinator
    webView.scrollView.bounces = true
    webView.scrollView.alwaysBounceVertical = true
    webView.scrollView.contentInsetAdjustmentBehavior = .never
    webView.isOpaque = true
    webView.backgroundColor = UIColor(red: 11 / 255, green: 18 / 255, blue: 32 / 255, alpha: 1)
    webView.scrollView.backgroundColor = webView.backgroundColor

    context.coordinator.loadApp(in: webView)
    return webView
  }

  func updateUIView(_ uiView: WKWebView, context: Context) {}

  final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler, WKURLSchemeHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {}

    func loadApp(in webView: WKWebView) {
      guard let url = URL(string: "dysc://app/index.html") else { return }
      webView.load(URLRequest(url: url))
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
      guard let requestURL = urlSchemeTask.request.url else {
        urlSchemeTask.didFailWithError(URLError(.badURL))
        return
      }

      var relative = requestURL.path
      if relative.isEmpty || relative == "/" {
        relative = "/index.html"
      }
      if relative.hasPrefix("/") {
        relative.removeFirst()
      }

      guard let fileURL = bundleFile(named: relative), let data = try? Data(contentsOf: fileURL) else {
        let message = "<!doctype html><meta name='viewport' content='width=device-width, initial-scale=1'><body style='font-family:-apple-system;background:#0b1220;color:#fff;padding:24px'>Could not load \(relative).</body>"
        let data = Data(message.utf8)
        let response = URLResponse(url: requestURL, mimeType: "text/html", expectedContentLength: data.count, textEncodingName: "utf-8")
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
        return
      }

      let response = URLResponse(
        url: requestURL,
        mimeType: mimeType(for: relative),
        expectedContentLength: data.count,
        textEncodingName: "utf-8"
      )
      urlSchemeTask.didReceive(response)
      urlSchemeTask.didReceive(data)
      urlSchemeTask.didFinish()
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
      let alert = UIAlertController(title: "Safety Checks", message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { _ in completionHandler(false) }))
      alert.addAction(UIAlertAction(title: "OK", style: .destructive, handler: { _ in completionHandler(true) }))
      presentAlert(alert)
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
      let alert = UIAlertController(title: "Safety Checks", message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { _ in completionHandler() }))
      presentAlert(alert)
    }

    private func presentAlert(_ alert: UIAlertController) {
      let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
      let root = scene?.windows.first(where: \.isKeyWindow)?.rootViewController
      root?.present(alert, animated: true)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
      decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
      let html = "<!doctype html><meta name='viewport' content='width=device-width, initial-scale=1'><body style='font-family:-apple-system;background:#0b1220;color:#fff;padding:24px'>The app failed to load. Press Play in Xcode again.<br><br>\(error.localizedDescription)</body>"
      webView.loadHTMLString(html, baseURL: nil)
    }

    private func bundleFile(named relative: String) -> URL? {
      let name = (relative as NSString).deletingPathExtension
      let ext = (relative as NSString).pathExtension
      if let url = Bundle.main.url(forResource: name, withExtension: ext, subdirectory: "www") {
        return url
      }
      if let root = Bundle.main.resourceURL?.appendingPathComponent("www").appendingPathComponent(relative),
         FileManager.default.fileExists(atPath: root.path) {
        return root
      }
      if let url = Bundle.main.url(forResource: name, withExtension: ext) {
        return url
      }
      return nil
    }

    private func mimeType(for path: String) -> String {
      switch (path as NSString).pathExtension.lowercased() {
      case "html": return "text/html"
      case "css": return "text/css"
      case "js": return "text/javascript"
      case "svg": return "image/svg+xml"
      case "webmanifest", "json": return "application/json"
      default: return "application/octet-stream"
      }
    }
  }
}
