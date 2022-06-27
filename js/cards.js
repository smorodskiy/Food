import { getJsonFromUrl } from "./services/services";

function cards() {
  // Шаблон карт(высота, ширина, название меню, текст меню, цена)
  class Cards {
    constructor(img, imgalt, title, description, price, parent) {
      // this.width = width;
      // this.height = height;
      this.imgalt = imgalt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.img = img;
      this.parent = document.querySelector(parent);
      //this.element = element;
      this.showCard();
    }

    showCard() {
      //console.log(this.parent);
      const element = document.createElement("div");
      element.classList.add("menu__item");
      element.innerHTML = `            
              
              <img src="${this.img}" alt="${this.imgalt}">
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.description}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
             
              `;

      this.parent.append(element);
    }
  }
  
  getJsonFromUrl("http://localhost:3000/menu").then((jsonData) => {  
    renderData(jsonData);
  });

  // Отобразить меню на странице
  function renderData(jsonData) {
    jsonData.forEach(({ img, imgalt, title, description, price }) => {
      new Cards(img, imgalt, title, description, price, ".menu .container");
    });
  }
}

export default cards;
