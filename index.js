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

function create({tag, attributes = {} }){
  const element = document.createElement(tag)
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value
  })
  return element
}

function createCard(result) {
  let card = document.createElement("div");
  card.className = "card";
  let cardL = document.createElement("div");
  cardL.className = "card-left";
  let cardR = document.createElement("div");
  cardR.className = "card-right";
  let cardImg = document.createElement("div");
  let cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  let addToWish = document.createElement("i");
  addToWish.className = "far fa-heart heart-icon";
  let likesSection = document.createElement("div");
  likesSection.className = "likes-section";
  let likesIcon = document.createElement("i");
  likesIcon.className = "fas fa-thumbs-up likes-icon";
  let ingredients = document.createElement("ul");

  // const image = create({tag: 'div', attributes: {className: 'card-img', style: { backgroundImage: `${result.image}` }}})
  // console.log(image)
  // cardImg.className = "card-img";
  // cardImg.style.backgroundImage = `url(${result.image})`;
  
 
  let recipeIngridArr = [];
  result.extendedIngredients.forEach(function (element) {
    let ingredient = document.createElement("li");
    ingredient.innerText = element.original;
    ingredients.appendChild(ingredient);
    recipeIngridArr.push(element.original);
  });
  
  cards.appendChild(card);
  card.appendChild(cardL);
  card.appendChild(cardR);
  cardL.appendChild(cardImg);
  cardR.appendChild(cardHeader);

  const title = create({tag: 'h2', attributes: {textContent: `${result.title}`}})
  cardHeader.appendChild(title);

  cardHeader.appendChild(addToWish);

  cardR.appendChild(likesSection);
  likesSection.appendChild(likesIcon);

  const likes = create({tag: 'p', attributes: {textContent: `${result.aggregateLikes}`}})
  likes.className = "likes";
  likesSection.appendChild(likes);

  const time = create({tag: 'h3', attributes: {textContent: ` Ready in ${result.readyInMinutes} minutes`}})
  cardR.appendChild(time);

  cardR.appendChild(ingredients);
  
  const recipe = create({tag: 'p', attributes: {innerHTML: `${result.instructions}`}})
  cardR.appendChild(recipe);
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
