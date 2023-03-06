function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function displayWeather(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var requestWeather =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=7a15c3334d6b00f3714da34b31d34a10";
  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var currentCity = data.city.name;
      var currentTemp = data.list[0].main.temp;
      var currentTempFahrenheit = (
        ((currentTemp - 273.15) * 9) / 5 +
        32
      ).toFixed(0);
      var currentHumidity = data.list[0].main.humidity;
      var currentWeatherIcon = data.list[0].weather[0].icon;
      var weatherIcon = document.getElementById("weatherIcon");
      var imageURL =
        "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
      var cityName = document.querySelector("#currentCity");
      var cityWeather = document.querySelector("#currentWeather");

      cityName.textContent = currentCity;
      cityWeather.textContent = "Temp: " + currentTempFahrenheit + "\u00B0F " + "Humidity: " + currentHumidity;
      weatherIcon.setAttribute("src", imageURL);
    });
}

function hpNews() {
  fetch('/news')
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    
    let i = 0;
    
    for (let j = 0; j < 10; j++) {
      console.log(j, i);
      
      $(`#f${j}`).children(`#title`).text(data[i].title);
      $(`#f${j}`).children(`#articleImage`).attr("src", data[i].urlToImage);
      $(`#f${j}`).children(`#author`).text(data[i].author);
      $(`#f${j}`).children(`#publishDate`).text(data[i].publishedAt.split('T')[0]);
      $(`#f${j}`).children(`#content`).text(data[i].content);
      $(`#f${j}`).children(`#articleUrl`).text("Full Article Here").attr("href", data[i].url);
      i++
    }
  });
}

getLocation();
hpNews();
