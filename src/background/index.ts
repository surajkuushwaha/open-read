// Use browser.* for Firefox, chrome.* for Chrome (from Plasmo build target)
const isFirefox = process.env.PLASMO_BROWSER === "firefox"
const browserAPI = isFirefox
  ? (globalThis as unknown as { browser: typeof chrome }).browser
  : undefined
const runtimeAPI = browserAPI?.runtime ?? chrome.runtime
const tabsAPI = browserAPI?.tabs ?? chrome.tabs

function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

runtimeAPI.onMessage.addListener(
  (
    message: { type: string; platformUrl: string; currentTabUrl?: string },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    if (message.type !== "OPEN_PLATFORM") return

    const currentTabUrl = message.currentTabUrl
    if (!currentTabUrl || !isValidHttpUrl(currentTabUrl)) {
      sendResponse()
      return
    }

    tabsAPI
      .create({ url: message.platformUrl + currentTabUrl })
      .then(() => sendResponse(), () => sendResponse())
    return true
  }
)
