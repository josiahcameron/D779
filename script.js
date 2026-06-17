const navLinks = document.querySelectorAll(".nav-link");
const pagePanels = document.querySelectorAll(".page-panel");
const accountToggle = document.getElementById("accountMenuToggle");
const accountDropdown = document.getElementById("accountDropdown");
const authAction = document.getElementById("authAction");
const statusMessage = document.getElementById("statusMessage");
const botToggle = document.getElementById("chatBotButton");
const botChat = document.getElementById("botChat");
let loggedIn = true;

function setActivePage(pageId) {
	navLinks.forEach((button) => {
		button.classList.toggle("active", button.dataset.page === pageId);
	});

	pagePanels.forEach((panel) => {
		panel.classList.toggle("active", panel.id === pageId);
	});

	const pageTitle = document.querySelector(".page-title");
	if (pageTitle) {
		pageTitle.textContent = document.querySelector(
			`.nav-link[data-page="${pageId}"]`,
		).textContent;
	}
}

function showStatus(message) {
	statusMessage.textContent = message;
	statusMessage.classList.add("visible");
	window.clearTimeout(showStatus.timeoutId);
	showStatus.timeoutId = window.setTimeout(() => {
		statusMessage.classList.remove("visible");
	}, 3200);
}

navLinks.forEach((button) => {
	button.addEventListener("click", () => {
		setActivePage(button.dataset.page);
	});
});

accountToggle.addEventListener("click", (event) => {
	event.stopPropagation();
	accountDropdown.classList.toggle("open");
});

accountDropdown.addEventListener("click", (event) => {
	event.preventDefault();
	const action = event.target.dataset.action;
	if (!action) return;

	accountDropdown.classList.remove("open");

	if (action === "settings") {
		showStatus("Opening account settings...");
	} else if (action === "help") {
		showStatus("Help center is available in the prototype.");
	} else if (action === "auth") {
		loggedIn = !loggedIn;
		authAction.textContent = loggedIn ? "Log Out" : "Log In";
		accountToggle.textContent = loggedIn ? "Welcome, Alex ▾" : "Guest ▾";
		showStatus(loggedIn ? "You are now signed in." : "You are now signed out.");
	}
});

botToggle.addEventListener("click", (event) => {
	event.stopPropagation();
	botChat.classList.toggle("open");
});

botChat.addEventListener("click", (event) => {
	event.preventDefault();
});

document.addEventListener("click", () => {
	accountDropdown.classList.remove("open");
	botChat.classList.remove("open");
});

setActivePage("accounts");
