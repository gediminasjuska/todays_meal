const firstOption = document.getElementById("option-1");
const secondOption = document.getElementById("option-2");
const vegetarianCheck = document.getElementById("vegetarian");
const veganCheck = document.getElementById("vegan");
const glutenCheck = document.getElementById("gluten");
const vegan = "&diet=vegan";
const vegetarian = "&diet=vegetarian";
const gluten = "&intolerances=gluten";
const numberOfRandomResults = 30;
const cards = document.getElementById("cards");
let randomRecept = {};
let firstArr = [];
let elementId = 0;
let randomArr = [];

dietCheck = function () {
  vegetarianCheck.addEventListener("click", function () {
    if (vegetarianCheck.value === "") {
      vegetarianCheck.value = "&diet=vegetarian";
    } else {
      vegetarianCheck.value = "";
    }
  });

  veganCheck.addEventListener("click", function () {
    if (veganCheck.value === "") {
      veganCheck.value = "&diet=vegan";
    } else {
      veganCheck.value = "";
    }
  });
  glutenCheck.addEventListener("click", function () {
    if (glutenCheck.value === "") {
      glutenCheck.value = "&intolerances=gluten";
    } else {
      glutenCheck.value = "";
    }
  });
};

function render() {
  dietCheck();

  firstOption.addEventListener("click", function () {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=82b80d934b85494f94a51a5223849b28${vegan}${gluten}`
    )
      .then((response) => response.json())
      .then(function (result) {
        result.results.forEach((element) => firstArr.push(element.id));

        for (let i = 0; i < 3; i++) {
          randomRecept = firstArr[Math.floor(Math.random() * firstArr.length)];
          randomArr.push(randomRecept);
        }

        for (j = 0; j < randomArr.length; j++) {
          let el = randomArr[j];
          fetch(
            `https://api.spoonacular.com/recipes/${el}/information?apiKey=82b80d934b85494f94a51a5223849b28`
          )
            .then((response) => response.json())
            .then(function (result) {
              let card = document.createElement("div");
              let cardL = document.createElement("div");
              let cardR = document.createElement("div");
              let cardImg = document.createElement("div");
              let cardHeader = document.createElement("div");
              let cardTitle = document.createElement("h2");
              let addToWish = document.createElement("i");
              let cardInfo = document.createElement("p");
              let cardTime = document.createElement("h3");
              let likesSection = document.createElement("div");
              let likesIcon = document.createElement("i");
              let likes = document.createElement("p");
              let ingredients = document.createElement("ul");

              cardL.className = "card-left";
              cardR.className = "card-right";
              cardImg.className = "card-img";
              card.className = "card";
              cardHeader.className = "card-header";
              addToWish.className = "far fa-heart heart-icon";
              likesSection.className = "likes-section";
              likes.className = "likes";
              likesIcon.className = "fas fa-thumbs-up likes-icon";

              cardImg.style.backgroundImage = `url(${result.image})`;
              cardTitle.innerText = result.title;
              cardInfo.innerText = result.instructions;
              cardTime.innerText = `Ready in ${result.readyInMinutes} minutes`;
              likes.innerText = `${result.aggregateLikes}`;

              result.extendedIngredients.forEach(function (element) {
                let ingredient = document.createElement("li");
                ingredient.innerText = element.original;
                ingredients.appendChild(ingredient);
              });

              cards.appendChild(card);
              card.appendChild(cardL);
              card.appendChild(cardR);
              cardL.appendChild(cardImg);
              cardR.appendChild(cardHeader);
              cardHeader.appendChild(cardTitle);
              cardHeader.appendChild(addToWish);
              cardR.appendChild(likesSection);
              likesSection.appendChild(likesIcon);
              likesSection.appendChild(likes);
              cardR.appendChild(cardTime);
              cardR.appendChild(ingredients);

              cardR.appendChild(cardInfo);
              console.log(result);
            });
        }

        console.log(randomArr);
        console.log(firstArr);
      })
      .catch((err) => console.log(err));
  });
}

// function createSmallCard() {
//   let card = document.createElement("div");
//   let cardL = document.createElement("div");
//   let cardR = document.createElement("div");
//   let cardImg = document.createElement("div");
//   let cardTitle = document.createElement("h2");
//   let cardInfo = document.createElement("p");
//   let cardTime = document.createElement("h3");

//   cardL.className = "card-left";
//   cardR.className = "card-right";
//   cardImg.className = "card-img";
//   card.className = "card";

//   cardImg.style.backgroundImage = `url(${arrayZero.image})`;
//   cardTitle.innerText = arrayZero.title;
//   cardInfo.innerText = arrayZero.instructions;
//   cardTime.innerText = `Ready in ${arrayZero.readyInMinutes} minutes`;

//   cards.appendChild(card);
//   card.appendChild(cardL);
//   card.appendChild(cardR);
//   cardL.appendChild(cardImg);
//   cardL.appendChild(cardTime);
//   cardR.appendChild(cardTitle);
//   cardR.appendChild(cardInfo);
// }

render();
