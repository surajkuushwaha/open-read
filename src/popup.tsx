import React, { useEffect, useState } from "react"
import "./popup.css"

import archiveIsLogo from "data-base64:../assets/images/website-logos/archive.is.svg"
import archiveOrgLogo from "data-base64:../assets/images/website-logos/archive.org.svg"
import removepaywallLogo from "data-base64:../assets/images/website-logos/removepaywall.com.svg"
import ft12Logo from "data-base64:../assets/images/website-logos/12ft.io.svg"
import googleLogo from "data-base64:../assets/images/website-logos/google.svg"

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

function isUrlFromPlatform(currentUrl: string, platform: typeof PLATFORMS[0]): boolean {
  if (!currentUrl) return false
  
  try {
    const url = new URL(currentUrl)
    const platformUrl = new URL(platform.url)
    
    // Check if the current URL's hostname matches or is a subdomain of the platform
    return url.hostname === platformUrl.hostname || url.hostname.endsWith('.' + platformUrl.hostname)
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
  const [currentTabURL, setCurrentTabURL] = useState<string | null>(null)

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        setCurrentTabURL(tabs[0]?.url || null)
      } catch (error) {
        console.error('Error getting current tab:', error)
      }
    }
    
    getCurrentTab()
  }, [])

  const handleButtonClick = (platform: typeof PLATFORMS[0]) => {
    openTab(platform)
  }

  const isCurrentUrlFromAnyPlatform = (): boolean => {
    if (!currentTabURL) return false
    return PLATFORMS.some(platform => isUrlFromPlatform(currentTabURL, platform))
  }

  return (
    <div className="container">
      {PLATFORMS.map((platform) => {
        const disabled = isCurrentUrlFromAnyPlatform()
        return (
          <button
            key={platform.id}
            className={`button ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && handleButtonClick(platform)}
            disabled={disabled}
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
        )
      })}
    </div>
  )
}

export default Popup