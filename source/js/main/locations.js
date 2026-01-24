"use strict";
(function () {
  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");
  const bullitItems = document.querySelectorAll(".js-bullit");
  const vw = window.innerWidth;

  const figures = map.querySelectorAll(".figure");

  const locations = {
    1: {
      title: "Горка для тюбинга",
      time: "11:00–21:00",
      link: "#downhill",
    },
    2: {
      title: "Лыжно-биатлонная трасса",
      time: "08:00–21:30",
      link: "#ski",
    },
    3: {
      title: "День студента на катке «Южный»",
      time: "14:30-17:30",
      link: "#skate",
    },
    4: {
      title: "ЗИМНИЕ АТТРАКЦИОНЫ, ФАН-ВСТРЕЧИ, СЦЕНА",
      time: "11:00-19:00",
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
    mapScroller?.scroll({ left: 135 });
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

  function onFigureClick(figure, event) {
    modalGoTo.classList.remove("is-hidden");
    const locationNumber = figure.classList[1].split("_")[1];
    let idList = vw < 768 ? `legend-item-${locationNumber}` : "map-list";
    let mapOffset =
      document.getElementById(idList).getBoundingClientRect().top +
      document.documentElement.scrollTop -
      100;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`,
    );

    const clickOnJsScroll = event?.target?.classList.contains("js-scroll");
    modalGoTo.href = links[locationNumber];

    if (!clickOnJsScroll) {
      window.scroll.animateScroll(mapOffset);
    }

    if (clickOnJsScroll) {
      resetFigures();
      resetLegends();
      return;
    }

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
      itemLi.id = `legend-item-${index}`;
      itemLink.classList.add("js-scroll");

      itemLi.addEventListener("click", function (event) {
        onFigureClick(figure, event);
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
