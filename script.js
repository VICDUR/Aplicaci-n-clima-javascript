
const apiKey = 'apikey'
const url = 'https://api.openweathermap.org/data/2.5/weather';
const diffkelvin = 273.15;

document.getElementById('searchButton').addEventListener('click',()=>{
   const cityValue =  document.getElementById('cityInput').value;
    if(!cityValue){
        alert('Ingrese una ciudad valida')
        return;
    }
    fetchtWeather(cityValue);  
   
});

async function fetchtWeather (city){
    const data = await fetch(`${url}?q=${city}&lang=es&appid=${apiKey}`);
    const {name, sys, main, weather} = await data.json();
    const infoClima = {
        name,
        country : sys.country,
        temp: Math.floor(main.temp - diffkelvin),
        description: weather[0].description,
        icon: weather[0].icon,
        humidity: main.humidity
    };
    showWeatherData(infoClima)
};


const showWeatherData = (data)=>{

   const {name, country, temp, description, icon, humidity} = data;

   const divResponse = document.getElementById('responseData');
   divResponse.innerHTML = '';

   const cityName = document.createElement('h2')
   cityName.textContent = `${name}, ${country}`

   const cityTemp = document.createElement('p')
   cityTemp.textContent = `La temperatura es: ${temp}`
   
   
   const cityHumidity = document.createElement('p')
   cityHumidity.textContent = `La humedad es del ${humidity}`
   
   const cityIcon = document.createElement('img')
   cityIcon.src = ` https://openweathermap.org/img/wn/${icon}@2x.png`
   
   const cityDescription = document.createElement('p')
   cityDescription.textContent = `${description}`

   divResponse.appendChild(cityName)
   divResponse.appendChild(cityTemp)
   divResponse.appendChild(cityHumidity)
   divResponse.appendChild(cityIcon)
   divResponse.appendChild(cityDescription)
};
