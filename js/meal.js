// https://developer.edamam.com

const applicationID = 'f7eeeb2b',
	applicationKey = 'd3af0f6aaa1e7059774460b7bea99643';

const searchDatabase = async (search) => {
	const endpoint = 'https://api.edamam.com/api/recipes/v2',
		query = `?type=public&q=${search}&app_id=${applicationID}&app_key=${applicationKey}`;

	const response = await fetch(endpoint + query);

	if (response.status !== 200) {
		throw new Error('Response status is not 200. Cannot fetch data.');
	}

	const data = await response.json();

	// console.log(data);

	return data;
};
