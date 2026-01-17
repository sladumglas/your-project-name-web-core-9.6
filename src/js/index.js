// 1) Сначала подключаем CSS Swiper, потом наш main.scss —
// тогда наши стили будут перекрывать swiper.css, а не наоборот.
require("swiper/css");
require("swiper/css/pagination");

require("../scss/main.scss");

const { initMenu } = require("./modules/menu");
const { initSliders } = require("./modules/sliders");
const { initShowAll } = require("./modules/show-all");

window.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initSliders();
  initShowAll();
});
