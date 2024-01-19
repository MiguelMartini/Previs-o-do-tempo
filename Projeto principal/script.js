// variaveis e selecao de elementos
const apiGeoKey = " ";

const apiweatherKey = " ";
const countryApi = "https://flagsapi.com/:country_code/:style/:size.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const stateElement = document.querySelector("#state");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const wheatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const countryElement = document.querySelector("#country");
let long = "";
let lati = "";

const weatherContainer = document.querySelector("#weather-data");
//  funcoes
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiweatherKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};
// geo api abaixo
const showLocationData = async(city) =>{
    const geoApiURL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiGeoKey}`;
    const geoRes = await fetch(geoApiURL);
    const geoData = await geoRes.json();
    
    if (geoRes.ok) {
      const stateCode = geoData.results[0].components.state_code;
      stateElement.innerText = `${stateCode}`;
    } else {
        stateElement.innerText = "Error fetching data.";
    }
    
}
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  // minhas var
  lati = data.coord.lat;
  long = data.coord.lon;
  countryElement.innerText = data.sys.country;

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  wheatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  showLocationData(city);

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showLocationData(city);
    showWeatherData(city);
  }
});

// estado
