const searchIngredient = document.querySelector('#search-ingredient');

searchIngredient.addEventListener('submit', (e) => {
	// prevent refresh
	e.preventDefault();

	// grab user input
	const userInput = searchIngredient.ingredient.value.trim();

	// reset the field after submitting
	searchIngredient.reset();

	// For errors
	const errorOutput = document.querySelector('#error');

	searchForRecipes(userInput)
		.then((recipes) => {
			updateUI(recipes), console.log(recipes);
		})
		.catch((error) => {
			console.log('Error - digestive problems.', error);
			errorOutput.innerText = 'No results. Try to adjust search parameters.';
		});
});

const searchForRecipes = async (search) => {
	const recipes = await searchDatabase(search);

	return recipes;
};

const updateUI = (recipes) => {
	const mealsSection = document.querySelector('#meals');

	recipes.hits.forEach((hit) => {
		// console.log(hit);

		// cuisineType check
		let cuisineType;
		if (hit.recipe.cuisineType !== undefined || '') {
			cuisineType = hit.recipe.cuisineType;
		} else {
			cuisineType = 'Not available';
		}

		mealsSection.innerHTML += `
			<h2>${hit.recipe.label}</h2>
			<img class="meal-image" src="${hit.recipe.image}" alt="${hit.recipe.label}">
			<p>Cuisine type: ${cuisineType}</p>
			<p>Meal type: ${hit.recipe.mealType}</p>
			<p>Dish type: ${hit.recipe.dishType}</p>
			<p>Yield: ${hit.recipe.yield}</p>
			<p>Calories: ${hit.recipe.calories}</p>
			<p>Contains ${hit.recipe.cautions}</p>
			<p>Diet labels: ${hit.recipe.dietLabels}</p>
			<p>Diet labels: ${hit.recipe.healthLabels}</p>
			
			<p>Total nutrients:
				<span>${hit.recipe.totalNutrients.CHOCDF.label},</span>
				<span>${hit.recipe.totalNutrients.CHOCDF.quantity}%</span>
			</p>
			
			<ul>Ingredients:
				<li>${hit.recipe.ingredientLines[0]}</li>
				<li>${hit.recipe.ingredientLines[1]}</li>
				<li>${hit.recipe.ingredientLines[2]}</li>
			</ul>
			<p>Total time: ${hit.recipe.totalTime} min</p>
			<p>Total weight: ${hit.recipe.totalWeight} g</p>
			<p>Source: <a href="${hit.recipe.url}" target="_blank" rel="noopener">${hit.recipe.source}</a></p>
		`;
	});
};

// ToDo:
// decide which properties to render and in which order
// Implement the rest of the checks for other properties
// diet labels - there's too many of them
// Total nutrients and weight round to 2-3 decimals
// sort the design
