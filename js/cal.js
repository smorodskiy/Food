document.addEventListener("DOMContentLoaded", () => {
  class Person {
    constructor(gender, growth, weight, age, activity) {
      this.gender = gender;
      this.growth = growth;
      this.weight = weight;
      this.age = age;
      this.activity = activity;
      this.calories();
    }

    // Для женщин: (10 х вес в кг) + (6,25 х рост в см) – (5 х возраст в г) – 161;
    // Для мужчин: (10 х вес в кг) + (6,25 х рост в см) – (5 х возраст в г) + 5;

    calories() {
      let genFormula = 0,
        formula = 0,
        activityNum = 0;

      switch (this.gender) {
        case "male":
          genFormula = -161;
          break;
        case "female":
          genFormula = 5;
          break;
        default:
          genFormula = 5;
          break;
      }

      switch (this.activity) {
        case "low":
          activityNum = 0.2;
          break;
        case "small":
          activityNum = 0.3;
          break;
        case "medium":
          activityNum = 0.4;
          break;
        case "high":
          activityNum = 0.5;
          break;
        default:
          activityNum = 0.3;
          break;
      }

      formula = 10 * this.weight + 6.25 * this.growth - 5 * this.age + genFormula;

      activityNum *= formula;

      return Math.round(formula + activityNum);
    }
  }

  // init

  let gender = "female",
    height,
    weight,
    age,
    activity = "small";

  const calcResult = document.querySelector(".calculating__result span");

  activityElements = document.querySelector(".calculating__choose_big");
  genderElements = document.querySelector("#gender");
  inputsParent = document.querySelector(".calculating__choose_medium");
  inputElements = inputsParent.children;

  (function initial() {
    if (localStorage.getItem("gender")) {
      gender = localStorage.getItem("gender");
    }
    if (localStorage.getItem("activity")) {
      activity = localStorage.getItem("activity");
    }

    removeActiveClass(genderElements);
    removeActiveClass(activityElements);

    function setActiveClass(parent) {
      for (const element of parent.children) {
        if (element.getAttribute("id") == gender) {
          element.classList.add("calculating__choose-item_active");
        }

        if (element.getAttribute("id") == activity) {
          element.classList.add("calculating__choose-item_active");
        }
      }
    }

    setActiveClass(activityElements);
    setActiveClass(genderElements);

    calc();
  })();

  for (const input of inputElements) {
    //console.log(element);
    inputsEvent(input);
  }

  // Remove active highlight
  function removeActiveClass(element) {
    for (let i = 0; i < element.children.length; i++) {
      element.children[i].classList.remove("calculating__choose-item_active");
    }
  }

  // Events on buttons
  function buttonsEvent(element) {
    element.addEventListener("click", (e) => {
      const event = e.target;
      if (
        event &&
        event.classList.contains("calculating__choose-item") &&
        !event.classList.contains("calculating__choose-item_active")
      ) {
        removeActiveClass(element);
        event.classList.add("calculating__choose-item_active");

        const index = Array.from(element.children).indexOf(event) + 1;

        if (element.getAttribute("id") == "gender") {
          switch (index) {
            case 1:
              gender = "female";
              break;
            case 2:
              gender = "male";
              break;
          }
        }

        if (element.getAttribute("id") == "activity") {
          switch (index) {
            case 1:
              activity = "low";
              break;
            case 2:
              activity = "small";
              break;
            case 3:
              activity = "medium";
              break;
            case 4:
              activity = "high";
              break;
          }
          console.log(activity);
        }

        calc();
      }
    });
  }

  buttonsEvent(activityElements);
  buttonsEvent(genderElements);

  function inputsEvent(input) {
    input.addEventListener("input", (e) => {
      const attr = input.getAttribute("id");

      switch (attr) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      if (checkInputs()) {
        input.style.border = "solid #FF0000";
      } else {
        input.style.border = "";
        calc();
      }
    });
  }

  function checkInputs() {
    // if (!height || !weight || !age) return;

    if (height > 250 || weight > 200 || age > 100 || height < 50 || weight < 10 || age < 1) {
      return false;
    } else {
      return true;
    }
  }

  function calc() {
    localStorage.setItem("gender", gender);
    localStorage.setItem("activity", activity);

    console.log(`${gender}, ${height}, ${weight}, ${age}, ${activity}`);

    if (checkInputs()) {
      const person = new Person(gender, height, weight, age, activity);
      calcResult.textContent = person.calories();
    } else {
      calcResult.textContent = "____";
    }
  }

  // const fruitBasket = ['banana', 'cherry', 'orange', 'apple',
  // 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
  // const div = fruitBasket.reduce((acc, index) => {
  //   if (!acc[index]) {
  //     acc[index] = 1;
  //   } else {
  //     acc[index] += 1;
  //   }
  //   return acc;
  // }, {});

  // let sortable = Object.entries(div);

  // sortable.sort((a, b) => b[1]-a[1]);

  // console.log(sortable);
});
