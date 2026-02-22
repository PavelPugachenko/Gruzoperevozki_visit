const root = document.documentElement;
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = nav ? nav.querySelectorAll("a") : [];
const leadForm = document.getElementById("lead-form");
const revealItems = document.querySelectorAll("[data-reveal]");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = root.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      root.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = new FormData(leadForm);
    const name = form.get("name")?.toString().trim() || "";
    const phone = form.get("phone")?.toString().trim() || "";
    const route = form.get("route")?.toString().trim() || "";
    const cargo = form.get("cargo")?.toString().trim() || "Не указано";

    const message = [
      "Здравствуйте! Хочу рассчитать перевозку.",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Маршрут: ${route}`,
      `Груз: ${cargo}`,
    ].join("\n");

    const telegramUsername = "Pavel_Pugachenko";
    const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
}
