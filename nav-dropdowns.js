(function () {
  "use strict";

  function closeAllOpen() {
    document.querySelectorAll(".header-nav .w3-dropdown-hover.is-open").forEach(function (w) {
      w.classList.remove("is-open");
      var b = w.querySelector(".labs-dropdown-trigger");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  function init() {
    var wraps = document.querySelectorAll(".header-nav .w3-dropdown-hover");
    if (!wraps.length) return;

    wraps.forEach(function (wrap) {
      var trigger = wrap.querySelector("button.labs-dropdown-trigger");
      if (!trigger || !wrap.querySelector(".w3-dropdown-content")) return;

      if (!trigger.getAttribute("type")) trigger.setAttribute("type", "button");
      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var opening = !wrap.classList.contains("is-open");
        closeAllOpen();
        wrap.classList.toggle("is-open", opening);
        trigger.setAttribute("aria-expanded", opening ? "true" : "false");
      });
    });

    document.addEventListener("click", function (e) {
      wraps.forEach(function (wrap) {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove("is-open");
          var b = wrap.querySelector(".labs-dropdown-trigger");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      wraps.forEach(function (wrap) {
        wrap.classList.remove("is-open");
        var b = wrap.querySelector(".labs-dropdown-trigger");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
