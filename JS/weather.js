const API_KEY = "03c71309464764666f364da3469fb32e";

function onGeoOk(position) {
  const lat = position.coords.latitude; //μλ
  const lng = position.coords.longitude; //κ²½λ

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");

      city.innerText = data.name;
      weather.innerText = /*${data.weather[0].main}*/ ` π${Math.floor(
        data.main.temp - 273.15
      )} Β°C`;
    });
}

function onGeoError() {
  alert("μμΉμ λ³΄λ₯Ό μ΄μ©ν  μ μμ΅λλ€.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
