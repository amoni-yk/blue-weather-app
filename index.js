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

//let temperature = document.querySelector("#temperature");

//function unitC(event) {
//event.preventDefault();
//temperature.innerHTML = `19`;
//}
//function unitF(event) {
//event.preventDefault();
//temperature.innerHTML = `66`;
//}

//let celsius = document.querySelector("#celsius-link");
//let farenheit = document.querySelector("#farenheit-link");
//celsius.addEventListener("click", unitC);
//farenheit.addEventListener("click", unitF);
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
  temperature.innerHTML = Math.round(response.data.main.temp);

  let city = document.querySelector(`#city`);
  city.innerHTML = response.data.name;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
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
