const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {
	const cityDets = data.cityDets;
	const weather = data.weather;

	// Update details template
	details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
      </div>
   `;

	// remove d-none class
	if (card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
};

const updateCity = async (city) => {
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);

	return { cityDets, weather };
};

cityForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	// update ui w/ new city
	updateCity(city)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
});
