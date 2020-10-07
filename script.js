var city = $("#current-city")
var temp = $("#current-temp")
var humidity = $("#current-humidity")
var windSpeed = $("#current-wind-speed")
var uvIndex = $("#uv-index")
var searchHistory = $("#search-history-list")
var citySearch = $("#search-city")
var citySearchButton = $("#search-city-button")
var clearHistory = $("#clear-history")
var weatherContent = $("#weather-content")

var apiKey = "7924a98840c84057f4c8da14e20d2b34"
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1

var currentDay = month + "/" + (day - 1);
var tomorrow = month + "/" + (day);
var day2 = month + "/" + (day + 1);
var day3 = month + "/" + (day + 2);
var day4 = month + "/" + (day + 3);
var day5 = month + "/" + (day + 4);

weekArray = [tomorrow, day2, day3, day4, day5]

$(document).ready(function() {
    if (localStorage.getItem("city")) {
        var lastItem = JSON.parse(localStorage.getItem("city"));
        var searchBar = $("<li> <button id=\"tester\"class=\"btn btn-secondary\">" + lastItem + "</button></li>")
        searchHistory.prepend(searchBar)
        
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + lastItem + "&APPID=7924a98840c84057f4c8da14e20d2b34"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        city.text(response.name + "  " + currentDay);
        city.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png" )
        var convertTemp = ((response.main.temp) - 273.15) * (9 / 5) + 32;
        temp.text(convertTemp.toFixed(1));
        temp.append("&deg;F");
        humidity.text(response.main.humidity + "%");
        windSpeed.text(response.wind.speed + "MPH");

        
        localStorage.setItem("city", JSON.stringify(citySearch.val()))
    

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
            uvIndex.text(response.value);
        });

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + apiKey + "&lat=" + latitude +  "&lon=" + longitude;

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            $('#five-day-forecast').empty();
            for (var i = 0; i < 5; i++) {

                var forecastCol = $("<div class= 'col-md-2'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text'>");
                var forecastHumidity = $("<p class='card-text'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(weekArray[i]);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
            }
        });})}})


function runWeather() {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch.val().trim() + "&APPID=7924a98840c84057f4c8da14e20d2b34"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        city.text(response.name + "  " + currentDay);
        city.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png" )
        var convertTemp = ((response.main.temp) - 273.15) * (9 / 5) + 32;
        temp.text(convertTemp.toFixed(1));
        temp.append("&deg;F");
        humidity.text(response.main.humidity + "%");
        windSpeed.text(response.wind.speed + "MPH");

        var searchBar = $("<li> <button id=\"tester\"class=\"btn btn-secondary\">" + citySearch.val() + "</button></li>")
        searchHistory.prepend(searchBar)
        localStorage.setItem("city", JSON.stringify(citySearch.val()))
    

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
            uvIndex.text(response.value);
        });

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + apiKey + "&lat=" + latitude +  "&lon=" + longitude;

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            $('#five-day-forecast').empty();
            for (var i = 0; i < 5; i++) {

                var forecastCol = $("<div class= 'col-md-2'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text'>");
                var forecastHumidity = $("<p class='card-text'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(weekArray[i]);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
            }
        });
})}

citySearchButton.on("click", function(){
    runWeather();})

clearHistory.on("click", function(){
    searchHistory.empty()
})






