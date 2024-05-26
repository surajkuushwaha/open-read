document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("archive.is")
		.addEventListener("click", () => openTab("archive.is"));
	document
		.getElementById("archive.org")
		.addEventListener("click", () => openTab("archive.org"));
	document
		.getElementById("removepaywall.com")
		.addEventListener("click", () => openTab("removepaywall.com"));
	document
		.getElementById("12ft.io")
		.addEventListener("click", () => openTab("12ft.io"));
	document
		.getElementById("google")
		.addEventListener("click", () => openTab("google"));

	function openTab(platform) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const currentTabURL = tabs[0].url;
			if (isValidHttpUrl(currentTabURL)) {
				chrome.tabs.create({ url: getPrefixURL(platform) + currentTabURL });
			}
		});
	}
});

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

function getPrefixURL(key) {
	switch (key) {
		case "archive.is":
			return "https://archive.is/newest/";
		case "archive.org":
			return "https://web.archive.org/";
		case "removepaywall.com":
			return "https://removepaywall.com/";
		case "12ft.io":
			return "https://12ft.io/";
		case "google":
			return "https://webcache.googleusercontent.com/search?q=cache:";

		default:
			throw new Error("invalid key!!");
	}
}
