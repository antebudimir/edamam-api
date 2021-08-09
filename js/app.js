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
		const properties = hit.recipe;

		const calories = properties.calories
				? properties.calories.toFixed(2)
				: 'No info',
			label = properties.label ? properties.label : 'Title not available',
			image = properties.image ? properties.image : 'Photo not available',
			cuisineType = properties.cuisineType ? properties.cuisineType : 'No info',
			cautions = properties.cautions ? properties.cautions : 'No info',
			dietLabels = properties.dietLabels ? properties.dietLabels : 'No info',
			healthLabels = properties.healthLabels
				? properties.healthLabels
				: 'No info',
			yield = properties.yield ? properties.yield : 'No info',
			dishType = properties.dishType ? properties.dishType : 'No info',
			mealType = properties.mealType ? properties.mealType : 'No info',
			totalTime = properties.totalTime
				? `${properties.totalTime}min`
				: 'No info',
			totalWeight = properties.totalWeight
				? `${properties.totalWeight.toFixed(2)}g`
				: 'No info',
			totalNutrients = properties.totalNutrients
				? properties.totalNutrients
				: 'No info',
			url = properties.url ? properties.url : '',
			source = properties.source ? properties.source : 'No info',
			ingredientLines = properties.ingredientLines
				? properties.ingredientLines
				: 'No info';

		// Separate diet labels in an array with a comma
		const sortedDietLabels = dietLabels.join(', ');

		// Separate cautions list in an array with a comma
		const sortedCautions = cautions.join(', ');

		// Create an li tag for each ingredient in the ingredientLines array
		function createIngredientsList() {
			const listedIngredients = ingredientLines.map((ingredient) => {
				return `<li>${ingredient}</li>`;
			});

			// remove commas and join in a single string
			const ingredients = listedIngredients.join('');

			return ingredients;
		}

		// Create an li tag for each health label in the healthLabels array
		function createHealthLabelsList() {
			const listedHealthLabels = healthLabels.map((label) => {
				return `<li>${label}</li>`;
			});

			// remove commas and join in a single string
			const labels = listedHealthLabels.join('');

			return labels;
		}

		// Create an li tag for nutrient in the totalNutrients json object
		// ${createNutrientsList()}

		// Output to the DOM
		mealsSection.innerHTML += `
			<h2>${label}</h2>

			<p>Cuisine type: ${cuisineType}</p>
			<p>Meal type: ${mealType}</p>
			<p>Dish type: ${dishType}</p>

			<img class="meal-image" src="${image}" alt="${label}">

			<ul>Ingredients:
				${createIngredientsList()}
			</ul>

			<p>Total time: ${totalTime}</p>

			<p>Yield: ${yield}</p>
			<p>Calories: ${calories}</p>
			<p>Total weight: ${totalWeight}</p>
			<p>Contains: ${sortedCautions}</p>
			<p>Diet labels: ${sortedDietLabels}</p>
			
			<ul>Health labels:
				${createHealthLabelsList()}
			</ul>
			
			<ul>Total nutrients:
			</ul>
			
			<p>Source: <a href="${url}" target="_blank" rel="noopener" title="${source} website">${source}</a></p>
		`;
	});
};

// ToDo:
// implement -l to the images
// sort the design
