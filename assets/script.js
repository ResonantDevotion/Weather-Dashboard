const searchBtn = $("#search-button");
const apiKey = "d91f911bcf2c0f925fb6535547a5ddc9"




// When search button is clicked, functions collects API data for that city
$("#search-button").on("click", function (event) {
    event.preventDefault();

    let city = $('#search-input').val().trim();
    let geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    let cityAjax = $.ajax({
        url: geoQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let latitude = response[0].lat.toFixed(2);
        let longitude = response[0].lon.toFixed(2);
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";


        // Pulling the forecast API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            const forecast = result.list;
            let forecastArray = []
            for (let i = 2; i < forecast.length; i += 8) {
                forecastArray.push(forecast[i]);

            };
            forecastArray.forEach(futureWeatherData);
        });


        // Function to collect CURRENT weather conditons
        let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
        $.ajax({
            url: currentWeatherUrl,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            displayWeatherData(result);
        });
        ////////// NOT WORKING
        // let currentTimeUnix = moment.unix(currentWeatherUrl.dt).format("Do MM YY");
        // console.log(currentTimeUnix);
    });



    // Function to display CURRENT city name, date, temp, humidity, wind speed data related to city + related icon
    function displayWeatherData(result) {
        //Getting the current city to diplay on html
        let currentCity = $('<h3>');
        currentCity.text("City: " + result.name)
        console.log(result.name);

        //Adding the icon
        let icon = $('<img>');
        icon.attr("src", `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);

        //adding the icon and city to a header on the html
        let header = $('<div>');
        header.addClass('d-flex justify-content-between');
        header.append(currentCity);
        header.append(icon);
        $('#today').append(header);

        //Getting the current temp to diplay on html
        let currentTemp = $('<h3>');
        currentTemp.text("Temperature: " + result.main.temp)
        console.log(result.main.temp);
        $('#today').append(currentTemp);

        //Getting the current humidity to diplay on html
        let currentHum = $('<h3>');
        currentHum.text("Humidity: " + result.main.humidity + "%")
        console.log(result.main.humidity);
        $('#today').append(currentHum);

        //Getting the current wind speed to diplay on html
        let currentWind = $('<h3>');
        currentWind.text("Wind speed: " + result.wind.speed + "kph")
        console.log(result.wind.speed);
        $('#today').append(currentWind);
    }

    //// Function to run thru forecast array and append forecst to forecast ID.
    function futureWeatherData(forecastArray) {

        //date
        let nextDay = $('<h3>');
        nextDay.text("date: " + moment.unix(forecastArray.dt).format('Do MMMM YYYY'))
        $('#forecast').append(nextDay);
        console.log(forecastArray.dt);

        //Adding the icon
        let icon = $('<img>');
        icon.attr("src", `http://openweathermap.org/img/wn/${forecastArray.weather[0].icon}@2x.png`);

        //adding the icon and date to a header on the html
        let header = $('<div>');
        header.addClass('d-flex justify-content-between');
        header.append(nextDay);
        header.append(icon);
        $('#forecast').append(header);

        //temp
        let nextDayTemp = $('<h3>');
        nextDayTemp.text("Temperature: " + forecastArray.main.temp)
        $('#forecast').append(nextDayTemp);
        console.log(forecastArray.main.temp);

        //humidity
        let nextDayHum = $('<h3>');
        nextDayHum.text("Humidity: " + forecastArray.main.humidity)
        $('#forecast').append(nextDayHum);
        console.log(forecastArray.main.humidity);
    }

    //Save user input city to local storage
    localStorage.setItem("city", city);


});

//SEARCH HISTORY
// create a event listener to getItem(city) from local storage when matching search history city is clicked
// $('#history').on('click', '#city', function(event){
//     localStorage.getItem(event)
// });