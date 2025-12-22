const weatherContainer = document.getElementById("weather-container");
let weatherData = [];

const displayWeather = (weatherData) => { 
    if (!weatherData || Object.keys(weatherData).length === 0) {
        weatherContainer.innerHTML = "<p>No weather data available.</p>";
        return;
    }
    displayWeatherData(weatherData);
}

const displayWeatherData = (data) => {
    const { weather, main, name } = data;
    weatherContainer.innerHTML = `<div id="weather-result"> 
                  <div id="description">
                  <img src="https://img.icons8.com/color/96/000000/partly-cloudy-day.png" alt="Partly Cloudy" width="150" height="150">
                </div>
                <div id="type">${weather[0].main}</div>
                <div id="temperature">${main.temp}°C</div>
                <div id="city">${name}</div>
                  
              
            </div>`;
}

const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        weatherContainer.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4985c9944c281ff2ed201baf328dbaa2`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            weatherData = data;
            displayWeather(data);
        })
        .catch((error) => {
            weatherContainer.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
        });
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (!city) {
            weatherContainer.innerHTML = "<p>Please enter a city name.</p>";
            return;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4985c9944c281ff2ed201baf328dbaa2`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                weatherData = data;
                displayWeather(data);
            })
            .catch((error) => {
                weatherContainer.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
            });
    }
});