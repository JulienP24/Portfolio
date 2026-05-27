const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

navToggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(open)));
});

const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach((link) => {
  const page = link.getAttribute("data-page");
  if (page === current || (current === "" && page === "index.html")) {
    link.classList.add("active");
  }
  link.addEventListener("click", () => nav?.classList.remove("open"));
});

const progress = document.querySelector(".scroll-progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const percent = max > 0 ? (scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${percent}%`;
};
addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";
      card.hidden = filter !== "all" && !categories.split(" ").includes(filter);
    });
  });
});

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  accordion.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
});
