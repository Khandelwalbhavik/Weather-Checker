const apikey="fa78a4b67df4caea0f7cf1a39ec9365d";

const weatherDataE1=document.getElementById("weather-data")

const cityInputE1=document.getElementById("city-input")

const formE1=document.querySelector("form")

formE1.addEventListener("submit",(event)=> {
    event.preventDefault();
    const cityValue = cityInputE1.value;
    console.log(cityValue); 
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

    if(!response.ok){
        throw new Error("Network response was not ok")
    }

    const data= await response.json()
    console.log(data);
    const temperature = Math.round(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity:${data.main.humidity}%`,
        `Wind speed:${data.wind.speed} m/s`,
    ]

    weatherDataE1.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

    weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`

    weatherDataE1.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
} catch (error) {
    weatherDataE1.querySelector(".icon").innerHTML="";

    weatherDataE1.querySelector(".temperature").textContent = "An error happened,please try again";

    weatherDataE1.querySelector(".details").innerHTML = "";
}
}