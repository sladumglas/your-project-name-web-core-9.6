const Swiper = require("swiper").default;
const { Pagination } = require("swiper/modules");

function createSwiper(root, paginationSelector, spaceBetween = 16) {
  if (!root) return null;

  const paginationEl = root.querySelector(paginationSelector);

  return new Swiper(root, {
    modules: [Pagination],
    slidesPerView: "auto",
    spaceBetween,
    watchOverflow: true,

    // ключевые опции для “не ломается при ресайзе”
    observer: true,
    observeParents: true,
    resizeObserver: true,

    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });
}

function isVisible(el) {
  // если display:none — Swiper посчитает ширины криво
  return !!(el && el.offsetParent !== null);
}

function initSliders() {
  const mqMobile = window.matchMedia("(max-width: 767px)");

  const roots = {
    brands: document.querySelector('[data-slider="brands"]'),
    devices: document.querySelector('[data-slider="devices"]'),
    prices: document.querySelector('[data-slider="prices"]'),
  };

  const swipers = {
    brands: null,
    devices: null,
    prices: null,
  };

  const enableMobile = () => {
    if (isVisible(roots.brands) && !swipers.brands) {
      swipers.brands = createSwiper(roots.brands, ".brands__pagination", 16);
    }
    if (isVisible(roots.devices) && !swipers.devices) {
      swipers.devices = createSwiper(roots.devices, ".devices__pagination", 16);
    }
    if (isVisible(roots.prices) && !swipers.prices) {
      swipers.prices = createSwiper(roots.prices, ".prices__pagination", 16);
    }

    // обязательно: пересчитать после применения media-query (display/block)
    requestAnimationFrame(() => {
      Object.values(swipers).forEach((s) => s && s.update());
    });
  };

  const disableDesktop = () => {
    Object.keys(swipers).forEach((key) => {
      if (swipers[key]) {
        swipers[key].destroy(true, true); // чистит inline-стили
        swipers[key] = null;
      }
    });
  };

  const sync = () => {
    if (mqMobile.matches) enableMobile();
    else disableDesktop();
  };

  sync();

  if (mqMobile.addEventListener) mqMobile.addEventListener("change", sync);
  else mqMobile.addListener(sync);

  let t = null;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(sync, 120);
  });

  window.addEventListener("orientationchange", () => {
    setTimeout(sync, 150);
  });
}

module.exports = { initSliders };