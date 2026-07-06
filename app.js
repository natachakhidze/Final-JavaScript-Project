document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initNewsletterForms();
  initJoinForm();
  initSmoothScroll();
  initUIEffects();
  initMobileMenu();
  initPageFeatures();
});

/* Navigation */
function setActiveNav() {
  const links = document.querySelectorAll(".main-nav a");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // More reliable active state
    if (
      currentPath === href ||
      (currentPath.includes("index.html") && href.includes("index.html")) ||
      (currentPath === "/" && href.includes("index.html"))
    ) {
      link.classList.add("active");
    }
  });
}

/* Newsletter and Forms */
function initNewsletterForms() {
  const forms = document.querySelectorAll(".subscribe-form");

  forms.forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);
  });
}

function initJoinForm() {
  const joinForm = document.querySelector(".join-form");
  if (!joinForm) return;

  const input = joinForm.querySelector("input[type='email']");
  const button = joinForm.querySelector("button");

  if (button) {
    button.addEventListener("click", () => handleFormSubmit(null, input));
  }
}

function handleFormSubmit(e, inputElement = null) {
  if (e) e.preventDefault();

  const input =
    inputElement ||
    (e && e.target.closest("form").querySelector("input[type='email']"));
  if (!input) return;

  const email = input.value.trim();

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // Simulate API call
  input.disabled = true;
  const originalText = input.placeholder;
  input.placeholder = "Processing...";

  setTimeout(() => {
    input.value = "";
    input.disabled = false;
    input.placeholder = originalText;
    showToast("Successfully joined the Solis collective! 🌿", "success");
  }, 1200);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* For Scrolling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/* Effects */
function initUIEffects() {
  // Button press effect
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      const btn = e.target.closest("button");
      btn.classList.add("pressed");
      setTimeout(() => btn.classList.remove("pressed"), 180);
    }
  });
}

/* For Mobile Resolution */
function initMobileMenu() {
  // You can expand this later with a hamburger button
  console.log(
    "%cMobile menu ready (expandable)",
    "color: #4ade80; font-size: 13px",
  );
}

/* Page Logic */
function initPageFeatures() {
  const page = getPage();

  switch (page) {
    case "architecture":
      architecturePage();
      break;
    case "energy":
      energyPage();
      break;
    case "intelligence":
      intelligencePage();
      break;
    case "index":
      indexPage();
      break;
  }
}

function getPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("architecture")) return "architecture";
  if (path.includes("energy")) return "energy";
  if (path.includes("intelligence")) return "intelligence";
  return "index";
}

/* Ecosystem */
function indexPage() {
  animateHero();
  animatePulseCards();
}

function animateHero() {
  const hero = document.querySelector("main");
  if (!hero) return;

  hero.style.opacity = "0";
  hero.style.transform = "translateY(30px)";

  setTimeout(() => {
    hero.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 150);
}

function animatePulseCards() {
  const cards = document.querySelectorAll(".pulse-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(
      () => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      },
      300 + i * 150,
    );
  });
}

/* Architecture */
function architecturePage() {
  animateCards(".card, .large-card, .small-card, .manifesto-item");
}

function animateCards(selector) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(25px)";
    setTimeout(() => {
      item.style.transition = `all 0.5s ease ${i * 80}ms`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 100);
  });
}

/* Energy */
function energyPage() {
  animateBars();
}

function animateBars() {
  const bars = document.querySelectorAll(".bar, .bar-fill, .progress");
  bars.forEach((bar, i) => {
    const originalTransform = bar.style.transform || "scaleY(0)";
    bar.style.transform = originalTransform;

    setTimeout(() => {
      bar.style.transition = "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
      bar.style.transform = "scaleY(1)";
    }, i * 120);
  });
}

/* Intelligence */
function intelligencePage() {
  liveCounter();
  pulseDots();
}

function liveCounter() {
  const el = document.querySelector(".harvest-info strong");
  if (!el) return;

  let value = 840;

  setInterval(() => {
    value += Math.floor(Math.random() * 15 - 6);
    if (value < 700) value = 700;
    el.textContent = `+${value}kg`;
  }, 1800);
}

function pulseDots() {
  const dots = document.querySelectorAll(".live-dot");
  if (dots.length === 0) return;

  setInterval(() => {
    dots.forEach((dot) => {
      dot.style.transition = "opacity 0.3s";
      dot.style.opacity = "0.3";

      setTimeout(() => {
        dot.style.opacity = "1";
      }, 280);
    });
  }, 1100);
}

/* Notifs */
function showToast(message, type = "success") {
  const toast = document.createElement("div");

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
  };

  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#111";
  toast.style.color = colors[type] || "#fff";
  toast.style.padding = "14px 24px";
  toast.style.borderRadius = "9999px";
  toast.style.zIndex = "10000";
  toast.style.fontSize = "15px";
  toast.style.boxShadow = "0 10px 15px -3px rgb(0 0 0 / 0.3)";
  toast.style.border = `1px solid ${colors[type]}33`;
  toast.style.opacity = "0";
  toast.style.transition = "all 0.3s ease";

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => (toast.style.opacity = "1"), 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
