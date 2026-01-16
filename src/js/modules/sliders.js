const Swiper = require("swiper").default;
const { Pagination } = require("swiper/modules");

require("swiper/css");
require("swiper/css/pagination");

function initSliders() {
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return;

  const create = (rootSelector) => {
    const root = document.querySelector(rootSelector);
    if (!root) return null;

    const paginationEl = root.querySelector(".swiper-pagination");
    if (!paginationEl) return null;

    return new Swiper(root, {
      modules: [Pagination],
      slidesPerView: "auto",
      spaceBetween: 16,
      watchOverflow: true,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
    });
  };

  create('[data-slider="brands"]');
  create('[data-slider="devices"]');
}

module.exports = { initSliders };
