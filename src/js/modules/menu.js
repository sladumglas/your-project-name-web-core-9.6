function initMenu() {
  const page = document.querySelector(".page");
  const menu = document.querySelector("#sideMenu");
  const overlay = document.querySelector("[data-menu-overlay]");
  const btnOpen = document.querySelector("[data-menu-open]");
  const btnClose = document.querySelector("[data-menu-close]");

  if (!page || !menu || !overlay || !btnOpen || !btnClose) return;

  const DESKTOP_MIN = 1366;

  const openMenu = () => {
    if (window.innerWidth >= DESKTOP_MIN) return;

    page.classList.add("page--menu-open", "page--locked");

    btnOpen.setAttribute("aria-expanded", "true");

    overlay.hidden = false;
  };

  const closeMenu = () => {
    page.classList.remove("page--menu-open", "page--locked");

    overlay.hidden = true;

    btnOpen.setAttribute("aria-expanded", "false");
  };

  btnOpen.addEventListener("click", openMenu);
  btnClose.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= DESKTOP_MIN) {
      page.classList.remove("page--menu-open", "page--locked");
      overlay.hidden = true;
      btnOpen.setAttribute("aria-expanded", "false");
    }
  });
}

module.exports = { initMenu };