const getWeatherButton = document.getElementById("get-weather-button");
const weatherContainer = document.getElementById("weather-container");
let weatherData = [];
fetch("https://api.openweathermap.org/data/2.5/weather?q=Lagos&units=metric&appid=4985c9944c281ff2ed201baf328dbaa2")
.then((response) => response.json())
.then((data) => {
    console.log(data);
    weatherData = data;
})
.catch((error)=> {
    weatherContainer.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
})

const displayWeather = (weatherData) => { 
    if (!weatherData || weatherData.length === 0) {
        weatherContainer.innerHTML = "<p>No weather data available.</p>";
        return;
    }
}

const displayWeatherData = (data) => {
    data.forEach((weather)=> {})
}