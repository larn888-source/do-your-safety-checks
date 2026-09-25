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
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
      guard let body = message.body as? [String: Any],
            body["action"] as? String == "copyPdf",
            let record = body["record"] as? [String: Any] else { return }
      let pdf = CheckPDF.data(from: record)
      let name = CheckPDF.fileName(from: record)
      let url = FileManager.default.temporaryDirectory.appendingPathComponent(name)
      do {
        try pdf.write(to: url, options: .atomic)
      } catch {
        return
      }
      DispatchQueue.main.async {
        let activity = UIActivityViewController(activityItems: [url], applicationActivities: nil)
        guard let root = self.topViewController() else { return }
        activity.popoverPresentationController?.sourceView = root.view
        root.present(activity, animated: true)
      }
    }

    private func topViewController() -> UIViewController? {
      let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
      var controller = scene?.windows.first(where: \.isKeyWindow)?.rootViewController
      while let presented = controller?.presentedViewController {
        controller = presented
      }
      return controller
    }

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

enum CheckPDF {
  static func hasProblems(_ record: [String: Any]) -> Bool {
    let units = record["units"] as? [[String: Any]] ?? []
    let trailers = record["trailers"] as? [[String: Any]] ?? []
    for owner in units + trailers {
      let categories = owner["categories"] as? [[String: Any]] ?? []
      for category in categories {
        let items = category["items"] as? [[String: Any]] ?? []
        if items.contains(where: { !(($0["problem"] as? String) ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }) {
          return true
        }
      }
    }
    return false
  }

  static func displayDate(_ value: String) -> String {
    let parts = value.split(separator: "-")
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    guard parts.count == 3, let month = Int(parts[1]), let day = Int(parts[2]), month >= 1, month <= 12 else { return value }
    return "\(day) \(months[month - 1]) \(parts[0])"
  }

  static func fileName(from record: [String: Any]) -> String {
    let date = (record["date"] as? String) ?? "record"
    let units = record["units"] as? [[String: Any]]
    let title = (units?.first?["title"] as? String) ?? "check"
    let raw = "safety-check-\(date)-\(title).pdf"
    let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: ".-"))
    return String(raw.unicodeScalars.map { allowed.contains($0) ? Character($0) : "-" })
  }

  static func data(from record: [String: Any]) -> Data {
    let page = CGRect(x: 0, y: 0, width: 595, height: 842)
    let renderer = UIGraphicsPDFRenderer(bounds: page)
    return renderer.pdfData { context in
      context.beginPage()
      let body = UIFont.systemFont(ofSize: 11)
      let heading = UIFont.boldSystemFont(ofSize: 16)
      let section = UIFont.boldSystemFont(ofSize: 13)
      let problem = UIFont.boldSystemFont(ofSize: 11)
      var y: CGFloat = 48
      func newPageIfNeeded(_ height: CGFloat) {
        if y + height > page.height - 48 {
          context.beginPage()
          y = 48
        }
      }
      func draw(_ text: String, font: UIFont, color: UIColor = .black, indent: CGFloat = 48) {
        let width = page.width - indent - 48
        let box = (text as NSString).boundingRect(with: CGSize(width: width, height: 2000), options: [.usesLineFragmentOrigin, .usesFontLeading], attributes: [.font: font], context: nil)
        newPageIfNeeded(box.height + 6)
        (text as NSString).draw(in: CGRect(x: indent, y: y, width: width, height: box.height + 2), withAttributes: [.font: font, .foregroundColor: color])
        y += box.height + 6
      }
      draw("Do Your Safety Checks", font: heading)
      let date = CheckPDF.displayDate(record["date"] as? String ?? "")
      let time = record["startTime"] as? String ?? ""
      let driver = record["driver"] as? String ?? ""
      let company = record["company"] as? String ?? ""
      draw("\(date)  \(time)", font: body)
      draw("\(driver)  ·  \(company)", font: body)
      if CheckPDF.hasProblems(record) {
        draw("YOU HAVE PROBLEMS REPORTED", font: section, color: .systemRed)
      } else {
        draw("NO PROBLEM 😊", font: section, color: .systemGreen)
      }
      let startMileage = (record["startMileage"] as? String ?? "").trimmingCharacters(in: .whitespaces)
      let endMileage = (record["endMileage"] as? String ?? "").trimmingCharacters(in: .whitespaces)
      draw("Start mileage: \(startMileage.isEmpty ? "Not recorded" : "\(startMileage) km")", font: body)
      draw("End mileage: \(endMileage.isEmpty ? "Not recorded" : "\(endMileage) km")", font: body)
      func drawOwner(_ label: String, owners: [[String: Any]]) {
        for (index, owner) in owners.enumerated() {
          let title = owner["title"] as? String ?? ""
          draw("\(label) \(index + 1): \(title)", font: section)
          let categories = owner["categories"] as? [[String: Any]] ?? []
          for category in categories {
            draw(category["title"] as? String ?? "", font: problem, indent: 48)
            let items = category["items"] as? [[String: Any]] ?? []
            for item in items {
              let label = item["label"] as? String ?? ""
              let note = item["problem"] as? String ?? ""
              if !note.isEmpty {
                draw("PROBLEM — \(label)", font: problem, color: .systemRed, indent: 60)
                draw(note, font: body, indent: 72)
              } else {
                let ok = item["ok"] as? Bool ?? false
                draw("\(ok ? "OK" : "—") — \(label)", font: body, indent: 60)
              }
            }
            let photos = category["photoCount"] as? Int ?? 0
            if photos > 0 { draw("Photos: \(photos)", font: body, indent: 60) }
          }
        }
      }
      drawOwner("Unit", owners: record["units"] as? [[String: Any]] ?? [])
      drawOwner("Trailer", owners: record["trailers"] as? [[String: Any]] ?? [])
    }
  }
}
