console.log("connected to main.js");

// array used to track all the food categories
// TASK 1
// Add more categories to the CATEGORY array
// Test that each works with the fetch request

const CATEGORY = ["Starter", "Beef", "Chicken", "Lamb", "Pasta", "Pork", "Seafood", "Vegetarian", "Vegan", "Side", "Dessert"];

// select element that will store our category options
let categories = document.getElementById("category");
let mealsList = document.querySelector(".mealsList");

// how our category options are stored
for (let i = 0; i < CATEGORY.length; i++) {
  let option = document.createElement("option");
  option.text = CATEGORY[i];
  categories.appendChild(option);
}

function getFetch() {
  const selectedCategory = categories.value.toLowerCase();
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // the line below clears the HTML each time a new category is requested, so that the items don't stack each time
      mealsList.innerHTML = "";

      // per category that is received in the data object,
      // there is a meals array
      // we will use the meals array to access individual meals

      if (data.meals && data.meals.length > 0) {
        for (let i = 0; i < data.meals.length; i++) {
          let container = document.createElement("div");
          container.classList.add("mealContainer");
          mealsList.appendChild(container);

          // use the example above to complete TASK 2
         // TASK 2
         // 1) add a header to the container
         // 2) add an image to the container UNDER the header
         // ex: "Broccoli & Stilton soup", followed by a picture of
         // broccoli & stilton soup
         // ... add code here

          let containerHeader = document.createElement("header");
          containerHeader.innerText = data.meals[i].strMeal; 
          containerHeader.classList.add("mealHeader");
          container.appendChild(containerHeader);

          let containerImage = document.createElement("img");
          containerImage.src = data.meals[i].strMealThumb; 
          containerImage.classList.add("mealImage");
          container.appendChild(containerImage);
        }
      } else {
        let noResultsMessage = document.createElement("p");
        noResultsMessage.innerText = "No recipes found for the selected category.";
        mealsList.appendChild(noResultsMessage);
      }
      return data;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}







