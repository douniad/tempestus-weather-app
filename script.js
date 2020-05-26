'use strict';

const appid = "f545988442b3d003b6afda2af5c926c7"
const searchURL = 'https://api.openweathermap.org/data/2.5/weather' 

function formatQueryParams(params) {
const queryItems = Object.keys(params)
.map(key => `${key}=${params[key]}`)
return queryItems.join('&');
}

function getWeather(q) {
 const params = {
    q,
    appid
  };

 const queryString = formatQueryParams(params)
 const url = searchURL+ '?' + queryString;

 return fetch(url)
 .then(response => response.json())    
 .catch(() => {
    msg.text = "Please search for a valid city";
  });
}

const allCities = []

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $("#js-error-message").text("")
    const cityName = $('#js-search-term').val();
    if (allCities.includes(cityName)) {
     $("#js-error-message").text(`You already know the weather for ${cityName}`)
     return 
    }
    allCities.push(cityName)
    $("#js-error-message").text("");
    $("#js-search-term").val("");
    $("js-search-term").focus();
    getWeather(cityName)
    .then(displayWeather)
    .catch(error => {
      $('#js-error-message').text(`Please search for a valid city!`);
    })
  })
}

$(watchForm);

function displayWeather(data) {
  const { main, name, sys, weather } = data;

  const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
  $("#weatherlist").append(`
  <li class="city"><h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp - 273.15)}<sup>°C</sup>
  </div>
  <figure>
  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
  <figcaption>${weather[0]["description"]}</figcaption>
  </figure> </li>`)
}
