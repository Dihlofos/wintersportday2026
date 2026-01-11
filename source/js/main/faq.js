"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  const showMoreButton = document.querySelector(".js-faq-show-more");
  const moreContent = document.querySelector(".js-more");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.parentNode.classList.toggle("active");
    });
  });

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener("click", () => {
    moreContent.classList.add("show");
    showMoreButton.classList.add("hidden");
  });
})();
