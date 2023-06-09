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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class = "col">
            <div class="forecast-date">${formatDay(forecastDay.time)}</div> 
            <img 
            src=  "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt='${forecastDay.condition.icon}' 
            width="50px"> 
            <div class="forecast-temperature">
              <span class="min"> ${Math.round(
                forecastDay.temperature.minimum
              )}° </span> 
               | 
               <span class="max"> ${Math.round(
                 forecastDay.temperature.maximum
               )}° </span>
            </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = `a6adb5d48c378f39061072to170cddc8`;
  let api_URL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(`${api_URL}`).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector(`#city`);
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind");
  let description = document.querySelector("#description");
  let weatherIcon = document.querySelector(`#city-icon`);

  celsiusTemperature = response.data.temperature.current;

  temperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.condition.description;
  weatherIcon.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function getCityWeather(city) {
  let apiKey = `a6adb5d48c378f39061072to170cddc8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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

getCityWeather(`Eindhoven`);
