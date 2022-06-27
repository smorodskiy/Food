function touchUs() {

  const forms = document.querySelectorAll("form");

  // Кнопка Связаться с нами
  const submitBtn = document.querySelectorAll("[data-submit]"),
    // Модальное окно
    modal = document.querySelector(".modal"),
    // Кнопка закрыть модальное окно
    closeModalBtn = document.querySelector("[data-modal]");

  // Закрыть модальное окно
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modal.addEventListener("click", (event) => {
    const e = event.target;
    if (e === modal) {
      closeModal();
    }
  });

  submitBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  forms.forEach((form) => {
    prepairData(form);
  });

  // Отправка данных
  async function postData(url, obj) {
    const postData = await fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: obj,
    });

    if (!postData.ok) {
      alert("Ошибка HTTP: " + postData.status);
    }

    return await postData.json();
  }

  // Формирование данных и отправка
  function prepairData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      let json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json);
    });
  }

}

module.exports = touchUs();