let result = document.getElementById("result");
let searchbtn = document.getElementById("search-inp");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let userinp = document.getElementById("user-inp").value;

searchbtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;
    if(userInp.length == 0){
        result.innerHTML = `<h3>Input Field cannot be empty</h3>`
    }
    else{
        fetch(url + userInp)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    let mymeal = data.meals[0];
    console.log(mymeal);
    console.log(mymeal.strMealThumb);
    console.log(mymeal.strMeal);
    console.log(mymeal.strArea);
    console.log(mymeal.strInstructions);
    // console.log(mymeal.)
    let count  = 1;
    let ingredients = [];
    for(let i in mymeal){
        let ingredient = "";
        let measure = "";
        if(i.startsWith("strIngredient") && mymeal[i] ){
            ingredient = mymeal[i];
            measure = mymeal[`strMeasure` + count];
            count ++;
            ingredients.push(`${measure} ${ingredient}`
            );
        }
    }
    console.log(ingredients);
    result.innerHTML = `<img src = ${mymeal.strMealThumb}>
    <div class = "details">
    <h2> ${mymeal.strMeal} </h2>
    <h4> ${mymeal.strArea} </h4>
    </div>
    <div id ="ingredient-con">
    </div>
    <div id = "recipe">
    <button id="hide-recipe"> x </button>
    <pre id="instructions">${mymeal.strInstructions} </pre>
    </div>
    <div class = "view-recipe-btn">
    <button id ="show-recipe"> View Recipe </button></div>
    `;
    let ingredientCon = document.getElementById("ingredient-con");
    let parent = document.createElement("ul");
    let hiderecipe = document.getElementById("hide-recipe");
    let showrecipe = document.getElementById("show-recipe");

    ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerHTML = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
    });

    hiderecipe.addEventListener("click", () => {
        recipe.style.display = "none";
    });
    showrecipe.addEventListener("click", () => {
        recipe.style.display = "block";
    });

});
    }
})
