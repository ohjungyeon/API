const api_key = `c73782f754feab7d010fb754a019588c`;

let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let citiname = [`Seoul`, `Paris`, `London`, `Chicago`];
let Hardness = document.querySelector("#Hardness");
let iconImg = document.querySelector("#icon");

App();

function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(lat, lon);
  });

  citiname.forEach((city) => {
    document.getElementById(city).addEventListener("click", () => {
      getWeatherByCity(city);
    });
  });
}

const getWeather = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=kr`
  );

  let data = await response.json();
  console.log(data);

  Weather(data);
};

const getWeatherByCity = async (cityName) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric&lang=kr`
  );

  let data = await response.json();
  console.log(data);

  Weather(data);
};

const Weather = (data) => {
  temp.textContent = data.main.temp;
  wind.textContent = data.wind.speed;
  place.textContent = data.name;
  des.textContent = data.weather[0].description;
  Hardness.textContent = data.coord.lon;

  let icon = data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  iconImg.setAttribute(`src`, iconUrl);
};
