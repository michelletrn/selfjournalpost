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
      var currentCity = data.city.name;
      var currentTemp = data.list[0].main.temp;
      var currentTempFahrenheit = (
        ((currentTemp - 273.15) * 9) / 5 +
        32
      ).toFixed(0);
      var currentWeatherIcon = data.list[0].weather[0].icon;
      var weatherIcon = document.getElementById("weatherIcon");
      var imageURL =
        "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
      var cityName = document.querySelector("#currentCity");
      var cityWeather = document.querySelector("#currentWeather");

      cityName.textContent = currentCity;
      cityWeather.textContent = currentTempFahrenheit + "\u00B0F";
      weatherIcon.setAttribute("src", imageURL);
    });
}

getLocation();

function hpNews() {
  // const newsUrl =
  //   "https://newsapi.org/v2/top-headlines?country=us&apiKey=344a9336cb9e4ecaa4645b7969a903ea";

  fetch('/news')
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const title0 = data[0].title;
      const urlImg0 = data[0].urlToImage;
      const author0 = data[0].author;
      const publishDate0 = data[0].publishedAt;
      const content0 = data[0].content;
      const url0 = data[0].url;

      const titleText0 = document.querySelector("#title0");
      const image0 = document.querySelector("#articleImage0");
      const authorText0 = document.querySelector("#author0");
      const publishedDate0 = document.querySelector("#publishDate0");
      const articleContent0 = document.querySelector("#content0");
      const articleURL0 = document.querySelector("#articleUrl0");

      titleText0.textContent = title0;
      image0.setAttribute("src", urlImg0);
      authorText0.textContent = "By:" + " " + author0;
      publishedDate0.textContent = Date(publishDate0);
      articleContent0.textContent = content0;
      articleURL0.setAttribute("href", url0);
      articleURL0.textContent = "Continue here:" + " " + url0;

      const title1 = data[1].title;
      const urlImg1 = data[1].urlToImage;
      const author1 = data[1].author;
      const publishDate1 = data[1].publishedAt;
      const content1 = data[1].content;
      const url1 = data[1].url;

      const titleText1 = document.querySelector("#title1");
      const image1 = document.querySelector("#articleImage1");
      const authorText1 = document.querySelector("#author1");
      const publishedDate1 = document.querySelector("#publishDate1");
      const articleContent1 = document.querySelector("#content1");
      const articleURL1 = document.querySelector("#articleUrl1");

      titleText1.textContent = title1;
      image1.textContent = urlImg1;
      image1.setAttribute("src", urlImg1);
      authorText1.textContent = "By:" + " " + author1;
      publishedDate1.textContent = Date(publishDate1);
      articleContent1.textContent = content1;
      articleURL1.setAttribute("href", url1);
      articleURL1.textContent = "Continue here:" + " " + url1;

      const title2 = data[2].title;
      const urlImg2 = data[2].urlToImage;
      const author2 = data[2].author;
      const publishDate2 = data[2].publishedAt;
      const content2 = data[2].content;
      const url2 = data[2].url;

      const titleText2 = document.querySelector("#title2");
      const image2 = document.querySelector("#articleImage2");
      const authorText2 = document.querySelector("#author2");
      const publishedDate2 = document.querySelector("#publishDate2");
      const articleContent2 = document.querySelector("#content2");
      const articleURL2 = document.querySelector("#articleUrl2");

      titleText2.textContent = title2;
      image2.textContent = urlImg2;
      image2.setAttribute("src", urlImg2);
      authorText2.textContent = "By:" + " " + author2;
      publishedDate2.textContent = Date(publishDate2);
      articleContent2.textContent = content2;
      articleURL2.setAttribute("href", url2);
      articleURL2.textContent = "Continue here:" + " " + url2;

      const title3 = data[3].title;
      const urlImg3 = data[3].urlToImage;
      const author3 = data[3].author;
      const publishDate3 = data[3].publishedAt;
      const content3 = data[3].content;
      const url3 = data[3].url;

      const titleText3 = document.querySelector("#title3");
      const image3 = document.querySelector("#articleImage3");
      const authorText3 = document.querySelector("#author3");
      const publishedDate3 = document.querySelector("#publishDate3");
      const articleContent3 = document.querySelector("#content3");
      const articleURL3 = document.querySelector("#articleUrl3");

      titleText3.textContent = title3;
      image3.textContent = urlImg3;
      image3.setAttribute("src", urlImg3);
      authorText3.textContent = "By:" + " " + author3;
      publishedDate3.textContent = Date(publishDate3);
      articleContent3.textContent = content3;
      articleURL3.setAttribute("href", url3);
      articleURL3.textContent = "Continue here:" + " " + url3;

      const title4 = data[4].title;
      const urlImg4 = data[4].urlToImage;
      const author4 = data[4].author;
      const publishDate4 = data[4].publishedAt;
      const content4 = data[4].content;
      const url4 = data[4].url;

      const titleText4 = document.querySelector("#title4");
      const image4 = document.querySelector("#articleImage4");
      const authorText4 = document.querySelector("#author4");
      const publishedDate4 = document.querySelector("#publishDate4");
      const articleContent4 = document.querySelector("#content4");
      const articleURL4 = document.querySelector("#articleUrl4");

      titleText4.textContent = title4;
      image4.textContent = urlImg4;
      image4.setAttribute("src", urlImg4);
      authorText4.textContent = "By:" + " " + author4;
      publishedDate4.textContent = Date(publishDate4);
      articleContent4.textContent = content4;
      articleURL4.setAttribute("href", url4);
      articleURL4.textContent = "Continue here:" + " " + url4;
    });
}

hpNews();
