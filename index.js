let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let allRecipes = document.querySelectorAll(".dishes");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let dishValue = document.querySelectorAll(".dishVal");
let count = 0;

const getData = async (value) => {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    let response = await data.json();

    console.log(response.meals);
    document.querySelector(".showRecipe").innerHTML = "";
    response.meals.forEach(function (data) {
      console.log(data);
      let div = document.createElement("div");
      div.classList.add("cardss");
      div.innerHTML = `
                <img src="${data.strMealThumb}" class="card-img-top" alt="">
                <h5>${data.strMeal}</h5>
                <div class="content" style="max-height: 320px; overflow-y: auto;">
                    <p class="ingredients" style="display: none;"></p>
                    <p class="instructions" style="display: none;"></p>
                </div>
                <button class="btn btn-primary view-more">View More</button>
            `;

      document.querySelector(".showRecipe").appendChild(div);

      let viewMoreBtn = div.querySelector(".view-more");
      viewMoreBtn.addEventListener("click", function () {
        // Hide the image, name, and button
        div.querySelector(".card-img-top").style.display = "none";
        div.querySelector("h5").style.display = "none";
        viewMoreBtn.style.display = "none";

        let ingredientsList = "";

        // Loop through the ingredients and measures
        for (let i = 1; i <= 20; i++) {
          let ingredient = data[`strIngredient${i}`];
          let measure = data[`strMeasure${i}`];

          if (ingredient) {
            ingredientsList += `<li>${ingredient} - ${measure}</li>`;
          }
        }

        // Show the ingredients list
        let ingredientsElement = div.querySelector(".ingredients");
        ingredientsElement.innerHTML = `<ul>${ingredientsList}</ul>`;
        ingredientsElement.style.display = "block";
        ingredientsElement.style.color = "black";
        ingredientsElement.style.fontsize = "5px";

        // Show the instructions
        let instructionsElement = div.querySelector(".instructions");
        instructionsElement.innerHTML = `<h6>Instructions:</h6><p>${data.strInstructions}</p>`;
        instructionsElement.style.display = "block";
        instructionsElement.style.color = "black";
        instructionsElement.style.opacity = "1";
        instructionsElement.style.visibility = "visible";
      });
    });
  } catch (error) {
    document.querySelector(".showRecipe").innerHTML =
      "<h1>Recipe Not Found</h1>";
  }
};
    
document.addEventListener("DOMContentLoaded", function () {
    getData("salad");
  });

searchBtn.addEventListener("click", function () {
  let searchVal = searchInput.value;
  if (searchVal == "") {
    alert("Search your recipe");
  } else {
    getData(searchVal);
  }
});

allRecipes.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

function showRecipes() {
  allRecipes.forEach(function (currVal) {
    currVal.style.transform = `translateX(-${count * 100}%)`;
  });
}
nextBtn.addEventListener("click", function () {
  count++;
  if (count == allRecipes.length) {
    count = 0;
  }
  showRecipes();
});
previousBtn.addEventListener("click", function () {
  count--;
  if (count == -1) {
    count = allRecipes.length - 1;
  }
  showRecipes();
});

dishValue.forEach(function (recipeData) {
  recipeData.addEventListener("click", function () {
    getData(recipeData.value);
  });
});

