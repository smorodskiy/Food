import slider from "./slider";
import cal from "./cal";
import touchUs from "./touchUs";
import cards from "./cards";
import promo from "./promo";
import tabs from "./tabs";
// import { tns } from "../node_modules/tiny-slider/src/tiny-slider";

document.addEventListener("DOMContentLoaded", () => {
  
  // var slider = tns({
  //   container: '.my-slider',
  //   items: 3,
  //   slideBy: 'page',
  //   autoplay: true
  // });

  slider();
  touchUs();
  promo('2022-06-30');
  tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
  cards();
  cal();
});
