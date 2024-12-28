// ------------------------------
// Toggle Style Switcher
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.onclick = () => {
  document.querySelector(".style-switcher").classList.toggle("open");
};

// ------------------------------
// hide and show - style-switcher and scroll-up
const styleSwitcher = document.querySelector(".style-switcher");
const scrollUp = document.querySelector(".scroll-up");

// ------------------------------
window.onscroll = () => {
  if (styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  }
  if (scrollY >= 300) {
    scrollUp.classList.add("open");
  } else {
    scrollUp.classList.remove("open");
  }
};
// ------------------------------
scrollUp.onclick = () => {
  scroll(0, 0);
};

// ------------------------------
const body = document.body;
const darkMode = document.querySelector(".dark-mode");
const activeStile = localStorage.activeStile;
// ------------------------------
window.onload = () => {
  if (localStorage.darkMode != null) {
    body.classList.add("dark");
  }

  if (activeStile) {
    setActiveStyle(activeStile);
  } else {
    setActiveStyle("skin-3");
  }
};

// ------------------------------
// Theme Light And Dark Mode
darkMode.onclick = () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.darkMode = "active";
  } else {
    localStorage.removeItem("darkMode");
  }
};

// ------------------------------
// Theme Colors
const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyle.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
      localStorage.activeStile = color;
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}
