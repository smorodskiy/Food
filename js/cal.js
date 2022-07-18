import $, { type } from "jquery";
import typeIs from "type-is";

function cal() {
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

  // init.

  let gender = "female",
    height,
    weight,
    age,
    activity = "small";

  let calcResult = $(".calculating__result span");

  let activityElements = $(".calculating__choose_big").children();
  let genderElements = $("#gender").children();
  let inputsParent = $(".calculating__choose_medium");
  let inputElements = $(inputsParent).children();

  (function initial() {
    if (localStorage.getItem("gender")) {
      gender = localStorage.getItem("gender");
    }
    if (localStorage.getItem("activity")) {
      activity = localStorage.getItem("activity");
    }

    removeActiveClass(genderElements);
    removeActiveClass(activityElements);

    function setActiveClass(elements) {
      elements.each(function () {
        if ($(this).attr("id") == gender) {
          $(this).addClass("calculating__choose-item_active");
          // console.log($(this).attr("id"));
        }

        if ($(this).attr("id") == activity) {
          $(this).addClass("calculating__choose-item_active");
        }
      });
    }

    setActiveClass(activityElements);
    setActiveClass(genderElements);

    calc();
  })();

  // Remove active highlight
  function removeActiveClass(element) {
    for (let i = 0; i < $(element).length; i++) {
      $(element[i]).removeClass("calculating__choose-item_active");
    }
  }

  // Events on buttons
  function buttonsEvent(element) {
    element.click(function () {
      // console.log(e);
      if (
        this &&
        $(this).hasClass("calculating__choose-item") &&
        !$(this).hasClass("calculating__choose-item_active")
      ) {
        // console.log(this);
        removeActiveClass(element);
        $(this).addClass("calculating__choose-item_active");

        // current index of this element
        let index = $(this).index() + 1;

        console.log($(this).parent().attr("id"));

        if ($(this).parent().attr("id") == "gender") {
          switch (index) {
            case 1:
              gender = "female";
              break;
            case 2:
              gender = "male";
              break;
          }

        } else {
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
          // console.log(activity);
        }

        saveToStorage();
        calc();
      }
    });
  }

  buttonsEvent(activityElements);
  buttonsEvent(genderElements);

  for (const input of inputElements) {
    inputsEvent(input);
  }

  function inputsEvent(input) {
    $(input).on("input", () => {
      const attr = $(input).attr("id");

      switch (attr) {
        case "height":
          height = +$(input).val();
          break;
        case "weight":
          weight = +$(input).val();
          break;
        case "age":
          age = +$(input).val();
          break;
      }

      if (checkInputs(input)) {
        $(input).css("border", "");
        calc();
      } else {
        $(input).css("border", "solid #FF0000");
      }
    });
  }

  function checkInputs(input) {
    if ($(input).attr("id") == "height") {
      let height_ = +$(input).val();
      if (height_ > 250 || height_ < 50) {
        $(calcResult).text("___");
        return false;        
      }
    }
    if ($(input).attr("id") == "weight") {
      let weight_ = +$(input).val();
      if (weight_ > 150 || weight_ < 10) {
        $(calcResult).text("___");
        return false;        
      }
    }
    if ($(input).attr("id") == "age") {
      let age_ = +$(input).val();
      if (age_ > 100 || age_ < 1) {
        $(calcResult).text("___");
        return false;        
      }
    }

    return true;
  }

  function saveToStorage() {
    localStorage.setItem("gender", gender);
    localStorage.setItem("activity", activity);
  }

  function calc() {

    if (typeof(height) != "number" && typeof(weight) != "number" && typeof(age) != "number") {
      return false;
    }
    if (height > 250 || height < 50 || weight > 150 || weight < 10 || age > 100 || age < 1) {
      return false;
    }

    console.log(`${gender}, ${height}, ${weight}, ${age}, ${activity}`);
    
    const total = new Person(gender, height, weight, age, activity).calories();
    console.log(total);
    if (isNaN(total)) {      
      $(calcResult).text("___");      
    } else {
      $(calcResult).text(total);
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
}

export default cal;
