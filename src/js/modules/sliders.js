const Swiper = require("swiper").default;
const { Pagination } = require("swiper/modules");

require("swiper/css");
require("swiper/css/pagination");

function createSwiper(root, paginationSelector, spaceBetween = 16) {
  if (!root) return null;

  const paginationEl = root.querySelector(paginationSelector);

  return new Swiper(root, {
    modules: [Pagination],
    slidesPerView: "auto",
    spaceBetween,
    watchOverflow: true,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });
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
    if (!swipers.brands) swipers.brands = createSwiper(roots.brands, ".brands__pagination", 16);
    if (!swipers.devices) swipers.devices = createSwiper(roots.devices, ".devices__pagination", 16);
    if (!swipers.prices) swipers.prices = createSwiper(roots.prices, ".prices__pagination", 16);
  };

  const disableDesktop = () => {
    Object.keys(swipers).forEach((key) => {
      if (swipers[key]) {
        swipers[key].destroy(true, true); 
        swipers[key] = null;
      }
    });
  };

  const sync = () => {
    if (mqMobile.matches) enableMobile();
    else disableDesktop();
  };


  sync();

  if (mqMobile.addEventListener) {
    mqMobile.addEventListener("change", sync);
  } else {

    mqMobile.addListener(sync);
  }


  let t = null;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(sync, 120);
  });
}

module.exports = { initSliders };