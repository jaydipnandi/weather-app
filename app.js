// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//api key : 6f4ef5bd07d87fb1fae7753b1cc33701
//76d7437144610dd8bf94751b10f995e5
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// APP Data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//APP Consts and Vars
const KELVIN = 273;
//API Key
const key = "6f4ef5bd07d87fb1fae7753b1cc33701";

// Check if Browser Supports Geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does't Support Geolocation</p>";
}

//SET User's Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude,longitude);
}

//Show error when there is an issue with geolocation service
function showError(error){
    notificationElement.gstyle.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//Get weather from API Provider
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

   // console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        //weather.description = data.weather[0].icon;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//Display weather to UI
function displayWeather()
{
    console.log(weather)
    iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&#8451;`;
   // descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}