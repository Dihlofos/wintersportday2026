"use strict";
(function () {
  const vw = window.innerWidth;
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
    offset: vw < 767 ? 100 : 180,
  });
})();
