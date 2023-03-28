let fullDate = new Date();
let dateTime = document.querySelector("#date-time");

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[fullDate.getDay()];
let hour = fullDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = fullDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

dateTime.innerHTML = `${day}|${hour}:${minute}`;

function locationButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(response) {
  console.log(response);
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = `fe1483f743b581b5520a1b725af03a49`;
  let api_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${api_URL}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector(`#city`);
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind");
  let description = document.querySelector("#description");
  let weatherIcon = document.querySelector(`#city-icon`);

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute(
    `src`,
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getCityWeather(city) {
  let apiKey = `fe1483f743b581b5520a1b725af03a49`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let cityName = document.querySelector(`#city`);
  cityName.innerHTML = `${city}`;
  getCityWeather(city);
}
let search = document.querySelector("#search-engine");
search.addEventListener("submit", searchBar);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", locationButton);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temperature`);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener(`click`, showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener(`click`, showCelsiusTemp);

let celsiusTemperature = null;
