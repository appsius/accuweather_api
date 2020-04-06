const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
	// destructure properties
	const { cityDets, weather } = data;

	// update details template
	details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
      </div>
   `;

	// update night/day icon
	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let timeSrc = null;
	if (weather.IsDayTime) {
		timeSrc = 'img/day.svg';
	} else {
		timeSrc = 'img/night.svg';
	}
	time.setAttribute('src', timeSrc);

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
