const weatherContainer = document.getElementById("weather-container");
let weatherData = [];

const displayWeather = (weatherData) => { 
    if (!weatherData || Object.keys(weatherData).length === 0) {
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerHTML = "<p>No weather data available.</p>";
        return;
    }
    
    if (weatherData.cod && Number(weatherData.cod) !== 200) {
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerHTML = `<p>Invalid city name: ${weatherData.message || 'Please try again.'}</p>`;
        return;
    }
    displayWeatherData(weatherData);
}

const displayWeatherData = (data) => {
    const { weather, main, name } = data;
    const weatherResult = document.getElementById("weather-result");
    weatherResult.innerHTML = `<div id="weather-result"> 
                  <div id="description">
                  <img src="image/sun.png" alt="Partly Cloudy" width="150" height="150" id="weather-icon">
                </div>
                <div id="type">${weather?.[0]?.main || ''}</div>
                <div id="temperature">${main?.temp ?? ''}°C</div>
                <div id="city">${name || ''}</div>
            </div>`;

    const weatherIcon = document.getElementById("weather-icon");
    const condition = weather?.[0]?.main;
    const iconCode = weather?.[0]?.icon; 
    const isNight = typeof iconCode === "string" && iconCode.endsWith("n");
    let iconSrc = "image/mist.png";
    if (condition === "Clouds") {
        iconSrc = isNight ? "image/cloud-night.png" : "image/cloud.png";
    } else if (condition === "Rain") {
        iconSrc = isNight ? "image/rain-night.png" : "image/rain.png";
    } else if (condition === "Snow") {
        iconSrc = "image/snow.png";
    } else if (condition === "Clear") {
        iconSrc = isNight ? "image/moon.png" : "image/sun.png";
    } else if (condition === "Thunderstorm") {
        iconSrc = "image/thunderstorm.png";
    }
    if (weatherIcon) weatherIcon.src = iconSrc;
}

const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerHTML = "<p>Invalid city name. Please enter a city name.</p>";
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
            const weatherResult = document.getElementById("weather-result");
            weatherResult.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
        });
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (!city) {
            const weatherResult = document.getElementById("weather-result");
            weatherResult.innerHTML = "<p>Please enter a city name.</p>";
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
                const weatherResult = document.getElementById("weather-result");
                weatherResult.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
            });
    }
});

 