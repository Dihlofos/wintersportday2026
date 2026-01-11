"use strict";
(function () {
  // let upButton = document.querySelector(".up");
  // if (upButton) {
  //   window.onscroll = function () {
  //     if (window.pageYOffset > 260) {
  //       upButton.classList.add("up--shown");
  //     } else {
  //       upButton.classList.remove("up--shown");
  //     }
  //   };
  // }
})();

"use strict";
(function () {
  const key = "shotgun-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");

  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });
})();

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

"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");
  const bullitItems = document.querySelectorAll(".js-bullit");

  const figures = map.querySelectorAll(".figure");

  const locations = {
    1: {
      title: "Биатлонная трасса",
      time: "08:00–15:30",
      link: "#race",
    },
    2: {
      title: "Горка для тюбинга",
      time: "11:00–21:00",
      link: "#tubing",
    },
    3: {
      title: "Каток",
      time: "Время",
      link: "#skate",
    },
    4: {
      title: "Зимние аттракционы",
      time: "Время",
      link: "#winter",
    },
    5: {
      title: "Сцена",
      time: "11:00–19:00",
      link: "#scene",
    },
  };

  const links = {
    1: "#race",
    2: "#tubing",
    3: "#skate",
    4: "#winter",
    5: "#scene",
  };

  setTimeout(() => {
    mapScroller?.scroll({ left: 150 });
  }, 500);

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure);
    });
  });

  modalGoTo.addEventListener("click", () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  });

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  init();

  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter("locationId");
    const artObjectLinks = document.querySelectorAll(".js-art-object-link");
    if (locationNumber) {
      setTimeout(() => {
        onGoToLocation(locationNumber);
      }, 0);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      });
    });

    bullitItems.forEach((item) => {
      item.addEventListener("click", (el) => {
        onGoToLocation(el.currentTarget.dataset.locationId);
      });
    });
  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove("is-hidden");
    const locationNumber = figure.classList[1].split("_")[1];
    const mapOffset =
      document.getElementById("map").getBoundingClientRect().top +
      document.documentElement.scrollTop;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`
    );

    modalGoTo.href = links[locationNumber];
    window.scroll.animateScroll(mapOffset);

    if (figure.classList.contains("is-active")) {
      resetFigures();
      resetLegends();
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add("is-active");
      legendItem.classList.add("is-active");
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove("is-active");
    });
  }

  function resetLegends() {
    const legends = document.querySelectorAll(".js-legend-item");
    legends.forEach((legend) => {
      legend.classList.remove("is-active");
    });
  }

  function onGoToLocation() {
    //
  }

  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  function fillLegendList() {
    const container = document.querySelector(".js-legend-list");
    const locationsArray = Object.entries(locations);

    locationsArray.forEach(([index, value]) => {
      const { title, time, link } = value;
      const figure = document.querySelector(`.figure_${index}`);
      // не показываем локации, которых нет на карте.
      if (!figure) return;

      const itemLi = document.createElement("li");
      const itemSpan = document.createElement("span");
      const itemP = document.createElement("p");
      const itemTime = document.createElement("time");
      const itemLink = document.createElement("a");

      itemLi.classList.add("map__list-item");
      itemLi.classList.add("js-legend-item");
      itemLi.dataset["legendItemId"] = index;
      itemLink.classList.add("js-scroll");

      itemLi.addEventListener("click", function () {
        onFigureClick(figure);
      });

      itemSpan.textContent = `${index}.`;
      itemP.textContent = title;
      itemTime.textContent = time;
      itemLink.href = link;
      itemLink.textContent = "Подробнее";
      itemP.prepend(itemSpan);
      itemLi.append(itemP);
      itemLi.append(itemTime);
      itemLi.append(itemLink);
      container.append(itemLi);
    });
  }
})();

"use strict";
(function () {
  function Marquee(selector, speed) {
    const parentSelector = document.querySelector(selector);
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;
    console.log(firstElement);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);

    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }

  //after window is completed load
  //1 class selector for marquee
  //2 marquee speed 0.2
  window.addEventListener("load", Marquee(".marquee", 0.2));
})();

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButton.addEventListener('click', () => {
    closeNav();
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

"use strict";
(function () {
  const slider = document.querySelector(".js-main-slider-container");
  const vw = window.innerWidth;
  const wrapper = slider.querySelector(".swiper-wrapper");

  console.log("warpper", slider);

  new Swiper(`.js-main-slider-concert`, {
    // Optional parameters
    slidesPerView: vw > 1024 ? 3 : 1,
    spaceBetween: 40,
    initialSlide: 0,
    draggable: false,
    pagination: false,
    loop: true,
    navigation: {
      nextEl: ".js-main-next-concert",
      prevEl: ".js-main-prev-concert",
    },
  });
})();

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
    offset: 180,
  });
})();
