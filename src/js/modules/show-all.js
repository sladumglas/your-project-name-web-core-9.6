function initShowAll() {
  initOne({
    sectionSelector: ".brands",
    listSelector: ".brands__list",
    buttonSelector: "[data-brands-toggle]",
    expandedClass: "brands__list--expanded",
  });

  initOne({
    sectionSelector: ".devices",
    listSelector: ".devices__list",
    buttonSelector: "[data-devices-toggle]",
    expandedClass: "devices__list--expanded",
  });
}

function initOne({ sectionSelector, listSelector, buttonSelector, expandedClass }) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const list = section.querySelector(listSelector);
  const btn = section.querySelector(buttonSelector);

  if (!list || !btn) return;

  const icon = btn.querySelector("img");
  const textEl = btn.querySelector("span");

  // На мобиле кнопка обычно скрыта стилями, но на всякий случай:
  if (window.innerWidth < 768) return;

  btn.addEventListener("click", () => {
    const expanded = list.classList.toggle(expandedClass);

    if (textEl) textEl.textContent = expanded ? "Скрыть" : "Показать все";

    if (icon) {
      icon.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
      icon.style.transition = "transform 0.2s ease";
    }
  });
}

module.exports = { initShowAll };
