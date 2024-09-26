document.getElementById('searchBtn').addEventListener('click', function() {
    const meal = document.getElementById('mealInput').value.trim();

    if(meal) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayMeals(data.meals);
                } else {
                    document.getElementById('mealResults').innerHTML = '<p>No meals found, please try another search.</p>';
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    } else {
        document.getElementById('mealResults').innerHTML = '<p>Please enter a meal name to search.</p>';
    }
});

function displayMeals(meals) {
    const mealContainer = document.getElementById('mealResults');
    mealContainer.innerHTML = '';

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <button onclick="viewMealDetails(${meal.idMeal})">View Details</button>
        `;

        mealContainer.appendChild(mealCard);
    });
}

function viewMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            alert(`
                Meal: ${meal.strMeal}
                Category: ${meal.strCategory}
                Area: ${meal.strArea}
                Instructions: ${meal.strInstructions}
            `);
        })
        .catch(error => {
            console.log('Error fetching meal details:', error);
        });
}
