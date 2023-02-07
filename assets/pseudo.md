# pseudo

## 1
- Get API key //
- Assign variable for the key
- Assign variable to the link
- Assign variable to the search key word
- $.ajax - call the ajax
.then ...
- Link IDs e.g. #search-form - add element in JS
- Add button listener to the search button
- list past searches (.val().trim) in left column - make button out of these
- values on click - load current day + 5 future days weather forecast for city


# When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

# When a user views the current weather conditions for that city they are presented with:

The city name
The date
An icon representation of weather conditions
The temperature
The humidity
The wind speed


# When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
- The date
- An icon representation of weather conditions
- The temperature
- The humidity

# When a user click on a city in the search history they are again presented with current and future conditions for that city








api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


af256969322283fd54785fbf28d0f313

d91f911bcf2c0f925fb6535547a5ddc9