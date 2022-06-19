document.addEventListener("DOMContentLoaded", () => {
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
      console.log(this.parent);
      const element = document.createElement("div");
      this.parent.innerHTML = `            
              <div class="menu__item">
              <img src="${this.img}" alt="${this.imgalt}">
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.description}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
              </div>
              `;

      this.parent.append(element);
    }
  }

  // // Добавляет карту на страницу
  // new Cards(
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   229,
  //   "img/tabs/vegy.jpg",
  //   '.menu .container'
  // );

  // new Cards(
  //   '1Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   229,
  //   "img/tabs/vegy.jpg",
  //   '.menu .container'
  // );

  // console.log(card);
  // Вывод кароточек из базы
  // На карточку можно кликать и узнавать подробности

  // Переменный с элементами Верхнего банера страницы
  const tabs = document.querySelector(".tabheader__items"),
    // Меню
    tabItems = document.querySelectorAll(".tabheader__item"),
    // Банер
    tabContent = document.querySelectorAll(".tabcontent"),
    // Банер
    submitBtn = document.querySelector("[data-submit]");

    submitBtn.addEventListener("click", () => {
        alert('23');
        
    });


  // Скрыть элемент
  function hideAllTabs() {
    tabContent.forEach((element) => {
      element.style.display = "none";
    });
  }

  function removeAllActiveClass() {
    tabItems.forEach((element) => {
      element.classList.remove("tabheader__item_active");
    });
  }

  hideAllTabs();
  tabContent[0].style.display = "block";
  //removeAllActiveClass();

  // Отобразить  по индексу
  function showTab(i = 0) {
    //console.log(tabContent[i]);
    tabContent[i].style.display = "block";
  }

  tabs.addEventListener("click", (e) => {
    const event = e.target;
    if (event && event.classList.contains("tabheader__item")) {
      hideAllTabs();
      removeAllActiveClass();
      tabItems.forEach((item, i) => {
        if (event == item) {
          //console.log(i);
          showTab(i);
        }
      });

      event.classList.toggle("tabheader__item_active");
    }
  });

  function getTimeLeft(endtime) {
    let endt = endtime;
    let nowTime = new Date();

    let diff = endt - nowTime;

    if (diff <= 0) {
      clearInterval(timer);
      return;
    }

    secsLeft = Math.floor((diff / 1000) % 60);
    minsLeft = Math.floor((diff / 1000 / 60) % 60);
    hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) % 60;

    // console.log(secsLeft);
    // console.log(minsLeft);
    // console.log(hoursLeft);
    // console.log(daysLeft);

    return {
      // 'total': diff,
      days: daysLeft,
      hours: hoursLeft,
      minutes: minsLeft,
      seconds: secsLeft,
    };
  }

  let promoDate = new Date(2022, 10, 13, 17, 25, 0);

  const timerBlock = document.querySelectorAll(".timer__block span");
  //const timerId = setInterval('');
  //console.log(timerBlock);

  function setTimeToPromoBlock(timeList) {
    timerBlock.forEach((item, i) => {
      item.innerHTML = ("0" + timeList[item.id]).slice(-2);
      //console.log();
      // console.log(timeList[days]);
    });
  }

  const timer = setInterval(() => {
    let promoTimeLeft = getTimeLeft(promoDate);
    // console.log(promoTimeLeft);
    if (promoTimeLeft) {
      setTimeToPromoBlock(promoTimeLeft);
    }
  }, 1000);

  fetch("http://localhost:3000/menu")
    .then((response) => response.json())
    .then((json) => getData(json));

  function getData(jsonData) {
    jsonData.forEach(({ img, imgalt, title, description, price }) => {
      new Cards(img, imgalt, title, description, price, ".menu .container");
    });
  }

  // function test(a, b, callback) {
  //     let c = a + b;
  //     callback(c);
  // }

  // test(1, 4, (num) => {
  //     console.log(num);
  // });
});
