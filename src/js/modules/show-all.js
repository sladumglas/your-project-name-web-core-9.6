function initShowAll() {
  const mqTabletUp = window.matchMedia("(min-width: 768px)");

  const items = [
    {
      listSel: ".brands__list",
      btnSel: "[data-brands-toggle]",
      expandedClass: "brands__list--expanded",
      defaultText: "Показать все",
      expandedText: "Скрыть",
    },
    {
      listSel: ".devices__list",
      btnSel: "[data-devices-toggle]",
      expandedClass: "devices__list--expanded",
      defaultText: "Показать все",
      expandedText: "Скрыть",
    },
  ];

  const getTextEl = (btn) => btn.querySelector('[class$="__toggle-text"]') || btn.querySelector("span");
  const getIconEl = (btn) => btn.querySelector('[class$="__toggle-icon"]') || btn.querySelector("img");

  const setUi = (btn, expanded, cfg) => {
    const textEl = getTextEl(btn);
    const iconEl = getIconEl(btn);

    if (textEl) textEl.textContent = expanded ? cfg.expandedText : cfg.defaultText;
    if (iconEl) iconEl.style.transform = expanded ? "rotate(180deg)" : "";
    if (btn) btn.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  const reset = (list, btn, cfg) => {
    if (list) list.classList.remove(cfg.expandedClass);
    if (btn) setUi(btn, false, cfg);
  };

  items.forEach((cfg) => {
    const list = document.querySelector(cfg.listSel);
    const btn = document.querySelector(cfg.btnSel);

    if (!list || !btn) return;
    if (!btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", () => {
      if (!mqTabletUp.matches) return;

      list.classList.toggle(cfg.expandedClass);
      const expanded = list.classList.contains(cfg.expandedClass);
      setUi(btn, expanded, cfg);
    });
  });

  const sync = () => {
    if (!mqTabletUp.matches) {
      items.forEach((cfg) => {
        const list = document.querySelector(cfg.listSel);
        const btn = document.querySelector(cfg.btnSel);
        if (list && btn) reset(list, btn, cfg);
      });
      return;
    }

    items.forEach((cfg) => {
      const list = document.querySelector(cfg.listSel);
      const btn = document.querySelector(cfg.btnSel);
      if (!list || !btn) return;

      const expanded = list.classList.contains(cfg.expandedClass);
      setUi(btn, expanded, cfg);
    });
  };

  sync();
  if (mqTabletUp.addEventListener) mqTabletUp.addEventListener("change", sync);
  else mqTabletUp.addListener(sync);
  let t = null;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(sync, 120);
  });
}

module.exports = { initShowAll };