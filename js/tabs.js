function tabs() {
  // Переменный с элементами Верхнего банера страницы
  const tabs = document.querySelector(".tabheader__items"),
    // Меню
    tabItems = document.querySelectorAll(".tabheader__item"),
    // Банер
    tabContent = document.querySelectorAll(".tabcontent");

  // Скрыть все баннеры вверху
  function hideAllTabs() {
    tabContent.forEach((element) => {
      element.style.display = "none";
    });
  }
  // Убрать активный класс из списка
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
}

module.exports = tabs();
