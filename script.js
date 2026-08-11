// ===== Navbar scroll effect =====
const navbar = document.getElementById("navbar");
const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const toggleMenu = (open) => {
  navLinks.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
};

menuToggle.addEventListener("click", () => {
  toggleMenu(!navLinks.classList.contains("open"));
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    toggleMenu(false);
  }
});

// ===== Scroll reveal animations =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll, { passive: true });
revealOnScroll();

// ===== Contact form (mailto-based, no backend needed) =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Validate
  if (!name) {
    showFormStatus("Please enter your name.", "error");
    form.name.focus();
    return;
  }
  if (!isValidEmail(email)) {
    showFormStatus("Please enter a valid email address.", "error");
    form.email.focus();
    return;
  }
  if (!message) {
    showFormStatus("Please enter your message.", "error");
    form.message.focus();
    return;
  }

  // Open email client with prefilled message
  const subject = encodeURIComponent("Portfolio Contact from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
  );
  window.location.href = "mailto:mohafurqan@gmail.com?subject=" + subject + "&body=" + body;

  showFormStatus(
    "✅ Thanks, " + name.split(" ")[0] + "! Your email app should open to send your message.",
    "success"
  );
  form.reset();
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = "form-status " + type;
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear(); 