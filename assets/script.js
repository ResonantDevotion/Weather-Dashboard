const searchBtn = $("#search-button");
const apiKey = "af256969322283fd54785fbf28d0f313";

const today = $('#today');
const forecast = $('#forecast');
const history = $('#history');


// When search button is clicked, functions collects API data for that city
$("#search-button").on("click", function (event) {
    event.preventDefault();

    today.empty();
    forecast.empty();

    // variable to get the trimmed input value entered into the search input area
    const city = $('#search-input').val().trim();
    // variable of the API url manipulated to search for the chosen city 
    const geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    //Ajax function to retreive the data from the API URL
    $.ajax({
        url: geoQueryURL,
        method: "GET"
    })
        // function to retrieve specific data from the API (lat and long) to input into another API for another function
        .then(function (response) {
            let latitude = response[0].lat.toFixed(2);
            let longitude = response[0].lon.toFixed(2);
            let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

            // Pulling the forecast API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (result) {
                    // console.log(result);
                    // variable that traverses the result object to retrieve the forecast data
                    const forecasts = result.list;
                    let forecastArray = []
                    // for loop that manipulates the result data to obtain only certain data and push it into the forecast array
                    for (let i = 2; i < forecasts.length; i += 8) {
                        forecastArray.push(forecasts[i]);
                    };
                    console.log(forecasts);

                    let currentCity = $('<h3>');
                    currentCity.text("City: " + city)
                    forecast.append(currentCity);

                    // for each item in the array, it runs the futureweatherdata function
                    forecastArray.forEach(futureWeatherData);
                });

            // Function to collect CURRENT weather conditons
            let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
            $.ajax({
                url: currentWeatherUrl,
                method: "GET"
            }).then(function (result) {
                console.log(currentWeatherUrl);
                displayWeatherData(result);
            });
            ////////// NOT WORKING
            // let currentTimeUnix = moment.unix(currentWeatherUrl.dt).format("Do MM YY");
            // console.log(currentTimeUnix);
        });



    // Function to display CURRENT city name, date, temp, humidity, wind speed data related to city + related icon
    function displayWeatherData(result) {

        today.clear;

        //Getting the current city to diplay on html
        let currentCity = $('<h3>');
        currentCity.text("City: " + city)

        //Adding the icon
        let icon = $('<img>');
        icon.attr("src", `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);

        //adding the icon and city to a header on the html
        let header = $('<div>');
        header.addClass('d-flex justify-content-between');
        header.append(currentCity);
        header.append(icon);
        today.append(header);

        //Getting the current temp to diplay on html
        let currentTemp = $('<h3>');
        currentTemp.text("Temperature: " + result.main.temp)
        today.append(currentTemp);

        //Getting the current humidity to diplay on html
        let currentHum = $('<h3>');
        currentHum.text("Humidity: " + result.main.humidity + "%")
        today.append(currentHum);

        //Getting the current wind speed to diplay on html
        let currentWind = $('<h3>');
        currentWind.text("Wind speed: " + result.wind.speed + "kph")
        today.append(currentWind);
    }

    // Function to run thru forecast array and append forecst to forecast ID.
    function futureWeatherData(forecastArray) {

        let card = $('<div>');
        card.addClass('card');
        forecast.append(card);
        forecast.addClass('card-group d-flex justify-content-between');

        let cardBody = $('<div>');
        cardBody.addClass('card-body');
        card.append(cardBody);

        //Adding the icon
        let icon = $('<img>');
        icon.attr("src", `https://openweathermap.org/img/wn/${forecastArray.weather[0].icon}@2x.png`);

        //adding the icon and date to a header on the html
        let header = $('<div>');
        header.addClass('d-flex justify-content-between');
        header.append(icon);
        cardBody.append(header);

        //date
        let nextDay = $('<p>');
        nextDay.text("Date: " + moment.unix(forecastArray.dt).format('Do MMMM YYYY'))
        cardBody.append(nextDay);
        console.log(forecastArray.dt);

        //temp
        let nextDayTemp = $('<p>');
        nextDayTemp.text("Temperature: " + forecastArray.main.temp)
        cardBody.append(nextDayTemp);
        console.log(forecastArray.main.temp);

        //humidity
        let nextDayHum = $('<p>');
        nextDayHum.text("Humidity: " + forecastArray.main.humidity)
        cardBody.append(nextDayHum);
        console.log(forecastArray.main.humidity);
    }

    //Save user input city to local storage
    localStorage.setItem("city", city);

    function addPreviousCity() {
        let previousCity = $('<div>');
        previousCity.addClass('btn btn-info');
        previousCity.append(localStorage.getItem("city"));
        history.append(previousCity)
    }

    addPreviousCity();
});

// let oldCity = previousCity.textContent

// // SEARCH HISTORY
// // create a event listener to getItem(city) from local storage when matching search history city is clicked
// history.on('click', oldCity, function (event) {

//     const oldCityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + oldCity + "&limit=1&appid=" + apiKey;
//     $.ajax({
//         url: oldCityURL,
//         method: "GET"
//     })
//         // function to retrieve specific data from the API (lat and long) to input into another API for another function
//         .then(function (response) {
//             let latitude = response[0].lat.toFixed(2);
//             let longitude = response[0].lon.toFixed(2);
//             let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
//         })
//     localStorage.getItem(event)
// });