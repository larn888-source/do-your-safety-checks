import SwiftUI
import WebKit
import UIKit

final class AppTheme: ObservableObject {
  static let shared = AppTheme()
  @Published var scheme: ColorScheme = .dark
}

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
    private weak var webView: WKWebView?

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
      guard let body = message.body as? [String: Any],
            let action = body["action"] as? String else { return }
      if action == "theme" {
        let theme = body["theme"] as? String ?? "dark"
        DispatchQueue.main.async { self.applyChrome(theme: theme) }
        return
      }
      if action == "copyMonthPdf" {
        let records = body["records"] as? [[String: Any]] ?? []
        if records.isEmpty { return }
        let title = ((body["title"] as? String) ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let label = title.isEmpty ? "Saved checks" : title
        let requested = (body["fileName"] as? String) ?? "\(label).pdf"
        presentShare(data: CheckPDF.monthData(records: records, title: label), name: CheckPDF.monthFileName(requested, fallback: label))
        return
      }
      guard action == "copyPdf",
            let record = body["record"] as? [String: Any] else { return }
      presentShare(data: CheckPDF.data(from: record), name: CheckPDF.fileName(from: record))
    }

    private func presentShare(data: Data, name: String) {
      let url = FileManager.default.temporaryDirectory.appendingPathComponent(name)
      do {
        try data.write(to: url, options: .atomic)
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
      self.webView = webView
      guard let url = URL(string: "dysc://app/index.html") else { return }
      webView.load(URLRequest(url: url))
    }

    func applyChrome(theme: String) {
      let light = theme == "light"
      AppTheme.shared.scheme = light ? .light : .dark
      let color = light
        ? UIColor(red: 243 / 255, green: 245 / 255, blue: 248 / 255, alpha: 1)
        : UIColor(red: 11 / 255, green: 18 / 255, blue: 32 / 255, alpha: 1)
      webView?.backgroundColor = color
      webView?.scrollView.backgroundColor = color
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
      let alert = UIAlertController(title: "HGV walkaround", message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { _ in completionHandler(false) }))
      alert.addAction(UIAlertAction(title: "OK", style: .destructive, handler: { _ in completionHandler(true) }))
      presentAlert(alert)
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
      let alert = UIAlertController(title: "HGV walkaround", message: message, preferredStyle: .alert)
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

  static func monthFileName(_ requested: String, fallback: String) -> String {
    let raw = requested.trimmingCharacters(in: .whitespacesAndNewlines)
    let base = raw.isEmpty ? "\(fallback).pdf" : raw
    let cleaned = base.replacingOccurrences(of: "/", with: " ").replacingOccurrences(of: ":", with: " ")
    let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: " .-"))
    var mapped = String(cleaned.unicodeScalars.map { allowed.contains($0) ? Character($0) : "-" })
    mapped = mapped.trimmingCharacters(in: .whitespacesAndNewlines)
    if mapped.isEmpty { mapped = fallback.isEmpty ? "Saved checks" : fallback }
    if !mapped.lowercased().hasSuffix(".pdf") { mapped += ".pdf" }
    return mapped
  }

  static func data(from record: [String: Any]) -> Data {
    render(records: [record], documentTitle: nil)
  }

  static func monthData(records: [[String: Any]], title: String) -> Data {
    render(records: records, documentTitle: title)
  }

  private static func render(records: [[String: Any]], documentTitle: String?) -> Data {
    let page = CGRect(x: 0, y: 0, width: 595, height: 842)
    let format = UIGraphicsPDFRendererFormat()
    if let documentTitle, !documentTitle.isEmpty {
      format.documentInfo = [
        kCGPDFContextTitle as String: documentTitle,
        kCGPDFContextCreator as String: "HGV walkaround"
      ]
    }
    let renderer = UIGraphicsPDFRenderer(bounds: page, format: format)
    return renderer.pdfData { context in
      let body = UIFont.systemFont(ofSize: 11)
      let heading = UIFont.boldSystemFont(ofSize: 16)
      let section = UIFont.boldSystemFont(ofSize: 13)
      let problem = UIFont.boldSystemFont(ofSize: 11)
      let titleFont = UIFont.boldSystemFont(ofSize: 20)
      var y: CGFloat = 48
      func paintTitle() {
        guard let documentTitle, !documentTitle.isEmpty else { return }
        let width = page.width - 96
        let box = (documentTitle as NSString).boundingRect(with: CGSize(width: width, height: 2000), options: [.usesLineFragmentOrigin, .usesFontLeading], attributes: [.font: titleFont], context: nil)
        (documentTitle as NSString).draw(in: CGRect(x: 48, y: y, width: width, height: box.height + 2), withAttributes: [.font: titleFont, .foregroundColor: UIColor.black])
        y += box.height + 12
      }
      func beginSheet() {
        context.beginPage()
        y = 48
        paintTitle()
      }
      func newPageIfNeeded(_ height: CGFloat) {
        if y + height > page.height - 48 {
          beginSheet()
        }
      }
      func label(_ record: [String: Any], _ key: String, fallback: String) -> String {
        guard let labels = record["labels"] as? [String: Any],
              let value = labels[key] as? String else { return fallback }
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? fallback : trimmed
      }
      func draw(_ text: String, font: UIFont, color: UIColor = .black, indent: CGFloat = 48, rtl: Bool = false) {
        let width = page.width - indent - 48
        let paragraph = NSMutableParagraphStyle()
        paragraph.baseWritingDirection = rtl ? .rightToLeft : .leftToRight
        paragraph.alignment = rtl ? .right : .left
        let attributes: [NSAttributedString.Key: Any] = [
          .font: font,
          .foregroundColor: color,
          .paragraphStyle: paragraph
        ]
        let box = (text as NSString).boundingRect(with: CGSize(width: width, height: 2000), options: [.usesLineFragmentOrigin, .usesFontLeading], attributes: attributes, context: nil)
        newPageIfNeeded(box.height + 6)
        (text as NSString).draw(in: CGRect(x: indent, y: y, width: width, height: box.height + 2), withAttributes: attributes)
        y += box.height + 6
      }
      func drawRecord(_ record: [String: Any]) {
        let rtl = label(record, "dir", fallback: "ltr") == "rtl"
        draw(label(record, "app", fallback: "HGV walkaround"), font: heading, rtl: rtl)
        let vehicleLabel = (record["vehicleLabel"] as? String ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let kind = record["vehicleType"] as? String ?? ""
        let rigid = kind == "rigid" || kind == "c1" || kind == "c2"
        let hideClassName = vehicleLabel.isEmpty || kind == "ce" || kind == "articulated" || vehicleLabel.hasPrefix("C&E") || vehicleLabel.compare("class 1", options: .caseInsensitive) == .orderedSame
        if !hideClassName {
          draw(vehicleLabel, font: section, rtl: rtl)
        }
        let date = CheckPDF.displayDate(record["date"] as? String ?? "")
        let time = record["startTime"] as? String ?? ""
        let driver = record["driver"] as? String ?? ""
        let company = record["company"] as? String ?? ""
        draw("\(date)  \(time)", font: body, rtl: rtl)
        draw("\(driver)  ·  \(company)", font: body, rtl: rtl)
        if CheckPDF.hasProblems(record) {
          draw(label(record, "problems", fallback: "YOU HAVE PROBLEMS REPORTED"), font: section, color: .systemRed, rtl: rtl)
        } else {
          draw(label(record, "clear", fallback: "NO PROBLEM 😊"), font: section, color: .systemGreen, rtl: rtl)
        }
        if let lines = record["mileageLines"] as? [String] {
          for line in lines {
            let trimmed = line.trimmingCharacters(in: .whitespacesAndNewlines)
            if !trimmed.isEmpty { draw(trimmed, font: body, rtl: rtl) }
          }
        } else {
          let startMileage = (record["startMileage"] as? String ?? "").trimmingCharacters(in: .whitespaces)
          let endMileage = (record["endMileage"] as? String ?? "").trimmingCharacters(in: .whitespaces)
          let notRecorded = label(record, "notRecorded", fallback: "Not recorded")
          let unit = label(record, "km", fallback: "km")
          draw("\(label(record, "startMileage", fallback: "Start mileage")): \(startMileage.isEmpty ? notRecorded : "\(startMileage) \(unit)")", font: body, rtl: rtl)
          draw("\(label(record, "endMileage", fallback: "End mileage")): \(endMileage.isEmpty ? notRecorded : "\(endMileage) \(unit)")", font: body, rtl: rtl)
        }
        let heightWord = label(record, "height", fallback: "Height")
        let problemWord = label(record, "problem", fallback: "PROBLEM")
        let okWord = label(record, "ok", fallback: "OK")
        let photosWord = label(record, "photos", fallback: "Photos")
        func drawOwner(_ ownerLabel: String, template: String, owners: [[String: Any]], numbered: Bool) {
          for (index, owner) in owners.enumerated() {
            let title = owner["title"] as? String ?? ""
            let headingText = numbered
              ? "\(template.replacingOccurrences(of: "{n}", with: "\(index + 1)")): \(title)"
              : "\(ownerLabel): \(title)"
            draw(headingText, font: section, rtl: rtl)
            let height = (owner["height"] as? String ?? "").trimmingCharacters(in: .whitespaces)
            if !height.isEmpty { draw("\(heightWord): \(height)", font: body, indent: 60, rtl: rtl) }
            let categories = owner["categories"] as? [[String: Any]] ?? []
            for category in categories {
              draw(category["title"] as? String ?? "", font: problem, indent: 48, rtl: rtl)
              let items = category["items"] as? [[String: Any]] ?? []
              for item in items {
                let itemLabel = item["label"] as? String ?? ""
                let note = item["problem"] as? String ?? ""
                if !note.isEmpty {
                  draw("\(problemWord) — \(itemLabel)", font: problem, color: .systemRed, indent: 60, rtl: rtl)
                  draw(note, font: body, indent: 72, rtl: rtl)
                } else {
                  let ok = item["ok"] as? Bool ?? false
                  draw("\(ok ? okWord : "—") — \(itemLabel)", font: body, indent: 60, rtl: rtl)
                }
              }
              let photos = category["photoCount"] as? Int ?? 0
              if photos > 0 { draw("\(photosWord): \(photos)", font: body, indent: 60, rtl: rtl) }
            }
          }
        }
        let vehicleWord = label(record, "vehicle", fallback: "Vehicle")
        let unitWord = label(record, "unit", fallback: "Unit")
        let trailerWord = label(record, "trailer", fallback: "Trailer")
        let unitLine = label(record, "unitLine", fallback: "Unit {n}")
        let trailerLine = label(record, "trailerLine", fallback: "Trailer {n}")
        drawOwner(rigid ? vehicleWord : unitWord, template: rigid ? vehicleWord : unitLine, owners: record["units"] as? [[String: Any]] ?? [], numbered: !rigid)
        if !rigid {
          drawOwner(trailerWord, template: trailerLine, owners: record["trailers"] as? [[String: Any]] ?? [], numbered: true)
        }
      }
      if records.isEmpty {
        beginSheet()
        return
      }
      for record in records {
        beginSheet()
        drawRecord(record)
      }
    }
  }
}
