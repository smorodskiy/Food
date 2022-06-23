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
        case 0:
          genFormula = -161;
          break;
        case 1:
          genFormula = 5;
          break;
        default:
          genFormula = 5;
          break;
      }

      switch (this.activity) {
        case 0:
          activityNum = 0.2;
          break;
        case 1:
          activityNum = 0.3;
          break;
        case 2:
          activityNum = 0.4;
          break;
        case 3:
          activityNum = 0.5;
          break;
        default:
          activityNum = 0.3;
          break;
      }

      formula =
        10 * this.weight + 6.25 * this.growth - 5 * this.age + genFormula;

      activityNum *= formula;

      return formula + activityNum;
    }
  }

  // button
  const gender = document.getElementById("gender");
  // inputs
  const height = document.getElementById("height");
  const weight = document.getElementById("weight");
  const age = document.getElementById("age");

  // buttons
  // calculating__choose_big
  const low = document.getElementById("low");
  const small = document.getElementById("small");
  const medium = document.getElementById("medium");
  const high = document.getElementById("high");
  const activity = document.querySelector(".calculating__choose_big");
  // result
  const calcResult = document.querySelector(".calculating__result span");

  // init
  let currentGender;
  let currentHeight;
  let currentWeight;
  let currentAge;
  let currentActivity;

  function calc(element, index) {
    if (element && element.classList.contains("calculating__choose_big")) {
      currentActivity = +index;
    }
    if (element && element.id == "gender") {
      currentGender = +index;
    }

    console.log(
      `${currentGender} ${currentHeight} ${currentWeight} ${currentAge} ${currentActivity}`
    );
    if (
      !isFinite(currentGender) ||
      !isFinite(currentHeight) ||
      !isFinite(currentWeight) ||
      !isFinite(currentAge) ||
      !isFinite(currentActivity)
    ) {
      calcResult.textContent = "____";
      return;
    }

    const person = new Person(
      currentGender,
      currentHeight,
      currentWeight,
      currentAge,
      currentActivity
    );

    calcResult.textContent = person.calories();
  }

  // Remove active highlight
  function removeActiveClass(element) {
    for (let i = 0; i < element.children.length; i++) {
      element.children[i].classList.remove("calculating__choose-item_active");
    }
  }

  // Events on buttons
  function addEvent(element) {
    element.addEventListener("click", (e) => {
      const event = e.target;
      if (
        event &&
        event.classList.contains("calculating__choose-item") &&
        !event.classList.contains("calculating__choose-item_active")
      ) {
        removeActiveClass(element);
        event.classList.add("calculating__choose-item_active");
        const index = Array.from(element.children).indexOf(event);

        calc(element, index);
      }
    });
  }

  function changeHeight(e) {
    currentHeight = e.target.value;
    calc();
  }
  function changeWeight(e) {
    currentWeight = e.target.value;
    calc();
  }
  function changeAge(e) {
    currentAge = e.target.value;
    calc();
  }

  addEvent(activity);
  addEvent(gender);

  height.addEventListener("input", (e) => changeHeight(e));
  weight.addEventListener("input", (e) => changeWeight(e));
  age.addEventListener("input", (e) => changeAge(e));
});
