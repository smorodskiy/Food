import slider from "./slider";
import cal from "./cal";
import touchUs from "./touchUs";
import cards from "./cards";
import promo from "./promo";
import tabs from "./tabs";

document.addEventListener("DOMContentLoaded", () => {
  slider();
  touchUs();
  promo('2022-06-30');
  tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
  cards();
  cal();
});
