function initServicesMore() {
  const section = document.querySelector(".services");
  if (!section) return;

  const btn = section.querySelector("[data-services-more]");
  if (!btn) return;

  const textEl = btn.querySelector(".services__more-text");
  const mqDesktop = window.matchMedia("(min-width: 1120px)");

  let expanded = false;

  const render = () => {
    if (mqDesktop.matches) {
      expanded = false;
      section.classList.remove("services--expanded");
      btn.setAttribute("aria-expanded", "false");
      if (textEl) textEl.textContent = "Читать дальше";
      return;
    }

    section.classList.toggle("services--expanded", expanded);
    btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (textEl) textEl.textContent = expanded ? "Скрыть" : "Читать дальше";
  };

  btn.addEventListener("click", () => {
    expanded = !expanded;
    render();
  });

  if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", render);
  else mqDesktop.addListener(render);

  render();
}

module.exports = { initServicesMore };