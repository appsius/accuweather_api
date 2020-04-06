const cityForm = document.querySelector('form');

const updateCity = async (city) => {
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets);

	return { cityDets, weather };
};

cityForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	// update ui w/ new city
	updateCity(city)
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
});
