const input = document.querySelector(".search-input");
const apiKey = '580fb4a80c155d85b2cfe97d8eac41aa';
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity-value");
const wind = document.querySelector(".wind-value");
const icon = document.querySelector(".weather-icon");


input.addEventListener("keydown", (event)=>{
  if(event.key === "Enter") {
    const city = input.value.trim();
    if(city){
      getWeather(city);
    }
  }
})


function getWeather(city){
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

  fetch(cityUrl)
  .then(response =>{
    if(!response.ok){
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data =>{
    showWeather(data)
  })
  .catch(error =>{
    console.error("chyba pri načítaní dát:", error);
  })
}

function showWeather(data){
  temperature.textContent = Math.round(data.main.temp) + "°C";
  description.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity + "%";
  wind.textContent = Math.round(data.wind.speed) + "km/h";
  const weatherIcon = data.weather[0].main

  if(weatherIcon == "Clouds"){
    icon.src = "imgs/cloudy_1163661.png";
  } else if(weatherIcon == "Clear") {
    icon.src = "imgs/sun_3073665.png";
  } else if(weatherIcon == "Rain"){
    if(data.weather[0].description.includes("light")){
      icon.src = "imgs/cloudy_rain_1163657.png";
    } else {
      icon.src = "imgs/rain-cloud_16405500.png";
    }
  }
}