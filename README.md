# Open Read - Cross Browser Extension

A browser extension that allows you to easily access archived versions of web pages through various services like Archive.is, Archive.org, and other paywall removal tools.

## Features

- Open current page in Archive.is
- Open current page in Archive.org (Wayback Machine)
- Remove paywalls with RemovePaywall.com
- Bypass paywalls with 12ft.io
- Access Google Cache version

## Development

Built using [Plasmo](https://www.plasmo.com/) for cross-browser compatibility.

### Setup

```bash
npm install
npm run dev
```

### Building

```bash
# Chrome (Manifest V3)
npm run build

# Firefox (Manifest V2)
npm run build -- --target=firefox-mv2

# Safari
npm run build -- --target=safari
```

### Installation

**Chrome:** Load unpacked extension from `build/chrome-mv3-prod/` at `chrome://extensions/`

**Firefox:** Load temporary add-on from `build/firefox-mv2-prod/` at `about:debugging`

**Safari:** Use extension from `build/safari-prod/`

## License

ISC