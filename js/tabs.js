function tabs(tabSelector, itemSelector, contentSelector, activeClass) {
  // Переменный с элементами Верхнего банера страницы
  const tabs = document.querySelector(tabSelector),
    // Меню
    tabItems = document.querySelectorAll(itemSelector),
    // Банер
    tabContent = document.querySelectorAll(contentSelector);

  // Скрыть все баннеры вверху
  function hideAllTabs() {
    tabContent.forEach((element) => {
      element.style.display = "none";
    });
  }
  // Убрать активный класс из списка
  function removeAllActiveClass() {
    tabItems.forEach((element) => {
      element.classList.remove(activeClass);
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
    if (event && event.classList.contains(itemSelector.slice(1))) {
      hideAllTabs();
      removeAllActiveClass();
      tabItems.forEach((item, i) => {1
        if (event == item) {
          console.log(i);
          showTab(i);
        }
      });

      event.classList.toggle(activeClass);
    }
  });
}

export default tabs;
