import React from "react"
import "./popup.css"

import archiveIsLogo from "data-base64:~assets/website-logos/archive.is.svg"
import archiveOrgLogo from "data-base64:~assets/website-logos/archive.org.svg"
import removepaywallLogo from "data-base64:~assets/website-logos/removepaywall.com.svg"
import ft12Logo from "data-base64:~assets/website-logos/12ft.io.svg"
import googleLogo from "data-base64:~assets/website-logos/google.svg"

const PLATFORMS = [
  {
    id: "archive.is",
    name: "Archive.is",
    logo: archiveIsLogo,
    url: "https://archive.is/newest/"
  },
  {
    id: "archive.org", 
    name: "Archive.org",
    logo: archiveOrgLogo,
    url: "https://web.archive.org/"
  },
  {
    id: "removepaywall.com",
    name: "Removepaywall", 
    logo: removepaywallLogo,
    url: "https://removepaywall.com/"
  },
  {
    id: "12ft.io",
    name: "12ft.io",
    logo: ft12Logo, 
    url: "https://12ft.io/"
  },
  {
    id: "google",
    name: "Google Cache",
    logo: googleLogo,
    url: "https://webcache.googleusercontent.com/search?q=cache:"
  }
]

function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

async function openTab(platform: typeof PLATFORMS[0]) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const currentTabURL = tabs[0].url
  
  if (currentTabURL && isValidHttpUrl(currentTabURL)) {
    chrome.tabs.create({ url: platform.url + currentTabURL })
  }
}

function Popup() {
  const handleButtonClick = (platform: typeof PLATFORMS[0]) => {
    openTab(platform)
  }

  return (
    <div className="container">
      {PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          className="button"
          onClick={() => handleButtonClick(platform)}
        >
          <img
            alt={`${platform.name} logo`}
            loading="lazy"
            width="20"
            height="20"
            decoding="async"
            src={platform.logo}
          />
          <span>{platform.name}</span>
        </button>
      ))}
    </div>
  )
}

export default Popup