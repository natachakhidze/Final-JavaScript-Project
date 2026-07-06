document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const page = detectPage();

  initNavigation();
  initForms();
  initSmoothScroll();
  initUIEffects();
  initMobileMenu();
  initPageLogic(page);
}

/* Detecting Pages */
function detectPage() {
  const path = location.pathname.toLowerCase();

  if (path.includes("architecture")) return "architecture";
  if (path.includes("energy")) return "energy";
  if (path.includes("intelligence")) return "intelligence";

  return "index";
}

/* Navigation */
function initNavigation() {
  const links = document.querySelectorAll(".main-nav a");
  const current = location.pathname.split("/").pop();

  links.forEach((link) => {
    const href = link.getAttribute("href")?.split("/").pop();

    if (
      href &&
      (href === current || (current === "" && href === "index.html"))
    ) {
      link.classList.add("active");
    }
  });
}

/* Forms */
function initForms() {
  document.querySelectorAll(".subscribe-form").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
  });

  const joinForm = document.querySelector(".join-form");
  if (joinForm) {
    const input = joinForm.querySelector("input");
    const button = joinForm.querySelector("button");

    button?.addEventListener("click", () => handleSubmit(null, input));
  }
}

function handleSubmit(e, inputOverride) {
  if (e) e.preventDefault();

  const input = inputOverride || e?.target?.querySelector("input");

  if (!input) return;

  const email = input.value.trim();

  if (!validateEmail(email)) {
    toast("Please enter a valid email address", "error");
    return;
  }

  input.disabled = true;
  const placeholder = input.placeholder;
  input.placeholder = "Processing...";

  setTimeout(() => {
    input.value = "";
    input.disabled = false;
    input.placeholder = placeholder;

    localStorage.setItem("solis_user_email", email);

    toast("Successfully joined the Solis collective! 🌿", "success");
  }, 1000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* For Smooth Scrolling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* For Effects */
function initUIEffects() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 150);
  });
}

/* For Mobile Resolutions */
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main-nav");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

/* Page Logic */
function initPageLogic(page) {
  const actions = {
    index: initIndexPage,
    architecture: initArchitecturePage,
    energy: initEnergyPage,
    intelligence: initIntelligencePage,
  };

  actions[page]?.();
}

/* Eco-System */
function initIndexPage() {
  animateHero();
  animatePulseCards();
}

function animateHero() {
  const hero = document.querySelector("main");
  if (!hero) return;

  hero.animate(
    [
      { opacity: 0, transform: "translateY(30px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 800,
      easing: "ease-out",
      fill: "forwards",
    },
  );
}

function animatePulseCards() {
  document.querySelectorAll(".pulse-card").forEach((card, i) => {
    setTimeout(() => {
      card.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 600,
          fill: "forwards",
        },
      );
    }, i * 120);
  });
}

/* Architecture */
function initArchitecturePage() {
  animateElements(".card, .large-card, .small-card, .manifesto-item");
}

function animateElements(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    setTimeout(() => {
      el.animate(
        [
          { opacity: 0, transform: "translateY(25px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 500,
          fill: "forwards",
        },
      );
    }, i * 80);
  });
}

/* Energy */
function initEnergyPage() {
  animateBars();
}

function animateBars() {
  document.querySelectorAll(".bar, .bar-fill, .progress").forEach((bar, i) => {
    setTimeout(() => {
      bar.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
        duration: 1200,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        fill: "forwards",
      });
    }, i * 100);
  });
}

/* Intelligence */
function initIntelligencePage() {
  liveCounter();
  pulseLiveDots();
}

function liveCounter() {
  const el = document.querySelector(".harvest-info strong");
  if (!el) return;

  let value = 840;

  setInterval(() => {
    value += Math.floor(Math.random() * 10 - 4);
    value = Math.max(700, value);
    el.textContent = `+${value}kg`;
  }, 1800);
}

function pulseLiveDots() {
  const dots = document.querySelectorAll(".live-dot");

  setInterval(() => {
    dots.forEach((dot) => {
      dot.animate([{ opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], {
        duration: 1000,
      });
    });
  }, 1200);
}

/* Notifs */
function toast(message, type = "success") {
  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
  };

  const el = document.createElement("div");
  el.textContent = message;

  Object.assign(el.style, {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#111",
    color: colors[type],
    padding: "14px 22px",
    borderRadius: "999px",
    fontSize: "14px",
    zIndex: "9999",
    opacity: "0",
    transition: "0.3s",
    border: `1px solid ${colors[type]}33`,
  });

  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(20px)";

    setTimeout(() => el.remove(), 300);
  }, 2500);
}
