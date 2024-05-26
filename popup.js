// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// List of platforms supported
	const platforms = [
		"archive.is",
		"archive.org",
		"removepaywall.com",
		"12ft.io",
		"google",
	];

	// Add click event listeners to each platform button
	platforms.forEach((platform) => {
		document
			.getElementById(platform)
			.addEventListener("click", () => openTab(platform));
	});

	// Function to open a new tab with the transformed URL
	function openTab(platform) {
		// Query the current active tab in the current window
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const currentTabURL = tabs[0].url;
			// Check if the current tab URL is valid or not
			if (isValidHttpUrl(currentTabURL)) {
				// Create a new tab with the transformed URL
				chrome.tabs.create({ url: getPrefixURL(platform) + currentTabURL });
			}
		});
	}

	// Function to validate if a string is a valid HTTP or HTTPS URL
	function isValidHttpUrl(string) {
		try {
			const url = new URL(string);
			return url.protocol === "http:" || url.protocol === "https:";
		} catch (_) {
			return false;
		}
	}

	// Function to get the prefix URL based on the platform key
	function getPrefixURL(key) {
		const urls = {
			"archive.is": "https://archive.is/newest/",
			"archive.org": "https://web.archive.org/",
			"removepaywall.com": "https://removepaywall.com/",
			"12ft.io": "https://12ft.io/",
			google: "https://webcache.googleusercontent.com/search?q=cache:",
		};

		if (!urls[key]) {
			throw new Error("invalid key!!");
		}
		// Return the corresponding URL prefix
		return urls[key];
	}
});
