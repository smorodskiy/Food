document.addEventListener("DOMContentLoaded", () => {
  const cal = require("./cal"),
    touchUs = require("./touchUs"),
    slider = require("./slider"),
    cards = require("./cards"),
    promo = require("./promo"),
    tabs = require("./tabs");

  touchUs();
  slider();
  promo();
  tabs();
  cards();
  cal();
});
