
const searchClick = document.getElementById("click-button");
searchClick.addEventListener("click", function(){
    let foodSearch = document.getElementById("food-search").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodSearch}`)
    .then(res => res.json())
    .then(data => displayFood(data))
});

const displayFood = data => {
    //displaying food by search result
    if(data.meals)
    {
        data.meals.forEach(meal => {
            const searchResultDiv = document.getElementById("search-result");
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-info';
            const foodInfo = `
            <img src = "${meal.strMealThumb}" onclick="foodDetails('${meal.idMeal}')";> 
            <h4 onclick="foodDetails('${meal.idMeal}')";>${meal.strMeal}</h4>
            `
            foodDiv.innerHTML = foodInfo;
            searchResultDiv.appendChild(foodDiv);
        })
    }
    else
    {
        //if search does not match
        const missingSearchResultDiv = document.getElementById("missing-result");
        const foodDiv = document.createElement('div');
        foodDiv.className = 'missing-info';
        const foodInfo = `
        <h4>Nothing Found with your search. Please search again.</h4>
        `
        foodDiv.innerHTML = foodInfo;
        missingSearchResultDiv.appendChild(foodDiv);
    }
}
//foodDetails for getting the information about that food after clicking 
const foodDetails = foodName => {
    const searchResultDiv = document.getElementById("search-result");
    searchResultDiv.style.display = "none"; //hiding the div(search result) after clicking for food details
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`)
    .then(res => res.json())
    .then(data => showFoodDetails(data));
}
//showFoodDetails is for last part to show the details of the selected food.
const showFoodDetails = data => {
    const food = data.meals[0];
    console.log(food);
    const lastDiv = document.getElementById("show-details");
    const lastFoodDiv = document.createElement('div');
    lastFoodDiv.className = 'last-food-info';
    const lastFoodInfo = `
    <img src = "${food.strMealThumb}">
    <h5>${food.strMeal}</h5>
    <h5>${food.strArea} Dish</h5>
    <h5>Category: ${food.strCategory}</h5>
    <p>Ingredient : <p>
    <ul>
    <li>${food.strIngredient1}</li>
    <li>${food.strIngredient2}</li>
    <li>${food.strIngredient3}</li>
    <li>${food.strIngredient4}</li>
    <li>${food.strIngredient5}</li>
    </ul>
    `
    lastFoodDiv.innerHTML = lastFoodInfo;
    lastDiv.appendChild(lastFoodDiv);
}