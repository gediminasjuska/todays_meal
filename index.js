const firstOption = document.getElementById("option-1");
const secondOption = document.getElementById("option-2");

const vegetarianCheck = document.getElementById("vegetarian");
const veganCheck = document.getElementById("vegan");
const glutenCheck = document.getElementById("gluten");

const vegetarianCheck1 = document.getElementById("vegetarian1");
const veganCheck1 = document.getElementById("vegan1");
const glutenCheck1 = document.getElementById("gluten1");

const cards = document.getElementById("cards");

let randomRecipe = {};
let firstRequest = [];
let randomRecipes = [];
let maxCalories = "";
firstOption.addEventListener("click", function () {
  document.getElementById("choose-random").classList.toggle("active");
});
secondOption.addEventListener("click", function () {
  document.getElementById("complex-choose").classList.toggle("active");
});

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
  vegetarianCheck1.addEventListener("click", function () {
    if (vegetarianCheck1.value === "") {
      vegetarianCheck1.value = "&diet=vegetarian";
    } else {
      vegetarianCheck1.value = "";
    }
  });

  veganCheck1.addEventListener("click", function () {
    if (veganCheck1.value === "") {
      veganCheck1.value = "&diet=vegan";
    } else {
      veganCheck1.value = "";
    }
  });
  glutenCheck1.addEventListener("click", function () {
    if (glutenCheck1.value === "") {
      glutenCheck1.value = "&intolerances=gluten";
    } else {
      glutenCheck1.value = "";
    }
  });
};

function getSendId() {
  for (j = 0; j < randomRecipes.length; j++) {
    let el = randomRecipes[j];
    fetch(
      `https://api.spoonacular.com/recipes/${el}/information?apiKey=82b80d934b85494f94a51a5223849b28`
    )
      .then((response) => response.json())
      .then(function (result) {
        createCard(result);
      });
  }
}
function generateRecipes() {
  for (let i = 0; i < 2; i++) {
    randomRecipe =
      firstRequest[Math.floor(Math.random() * firstRequest.length)];
    randomRecipes.push(randomRecipe);
  }
}

function maxCaloriesFunc() {
  if (document.getElementById("max-calories").value === "") {
    maxCalories = "";
  } else {
    maxCalories = `&maxCalories=${
      document.getElementById("max-calories").value
    }`;
  }
  return maxCalories;
}

function createCard(result) {
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
  cardInfo.innerHTML = `Instructions:\n${result.instructions}`;
  cardTime.innerText = `Ready in ${result.readyInMinutes} minutes`;
  likes.innerText = `${result.aggregateLikes}`;

  let wishArr = [];
  let recipeIngridArr = [];
  let recipeObj = {};
  result.extendedIngredients.forEach(function (element) {
    let ingredient = document.createElement("li");
    ingredient.innerText = element.original;
    ingredients.appendChild(ingredient);
    recipeIngridArr.push(element.original);
  });

  function pushToWishList() {
    let keyId = "id";
    let keyImg = "image";
    let keyTitle = "title";
    let keyIns = "instructions";
    let keyTime = "readyInMinutes";
    let keyLikes = "aggregateLikes";
    let keyIngrid = "Ingredients";

    recipeObj[keyId] = result.id;
    recipeObj[keyImg] = result.image;
    recipeObj[keyTitle] = result.title;
    recipeObj[keyIns] = result.instructions;
    recipeObj[keyTime] = result.readyInMinutes;
    recipeObj[keyLikes] = result.aggregateLikes;
    recipeObj[keyIngrid] = recipeIngridArr;
  }
  pushToWishList();
  wishArr.push(recipeObj);
  console.log(wishArr);
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
}

function restoreDefaults() {
  randomRecipe = {};
  firstRequest = [];
  randomRecipes = [];
}

function render() {
  dietCheck();
  document.getElementById("search-1").addEventListener("click", function () {
    restoreDefaults();
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=82b80d934b85494f94a51a5223849b28${vegetarianCheck.value}${glutenCheck.value}${veganCheck.value}&number=50&instructionsRequired=true`
    )
      .then((response) => response.json())
      .then(function (result) {
        result.results.forEach((element) => firstRequest.push(element.id));

        generateRecipes();
        getSendId();
      })
      .catch((err) => console.log(err));
  });

  document.getElementById("search-2").addEventListener("click", function () {
    {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=82b80d934b85494f94a51a5223849b28${
          document.getElementById("cousine").value
        }${document.getElementById("meal-type").value}${
          document.getElementById("cook-time").value
        }${maxCaloriesFunc()}${veganCheck1.value}${vegetarianCheck1.value}${
          glutenCheck1.value
        }&number=30&instructionsRequired=true`
      )
        .then((response) => response.json())
        .then(function (result) {
          result.results.forEach((element) => firstRequest.push(element.id));

          generateRecipes();
          getSendId();
        })
        .catch((err) => console.log(err));
    }
  });
}

render();
