let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");
let tempCel = document.getElementById("tempCel");
let skyDescription = document.getElementById("skyDescription");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let feelsLike = document.getElementById("feelsLike");
let visibility = document.getElementById("visibility");
let coPercentage = document.getElementById("coPercentage");
let so2Percentage = document.getElementById("so2Percentage");
let o3Percentage = document.getElementById("o3Percentage");
let no2Percentage = document.getElementById("no2Percentage");
let dateEl = document.getElementById("dateEl");
let timeEl = document.getElementById("timeEl");
let sunriseEl = document.getElementById("sunrise");
let sunsetEl = document.getElementById("sunset");

let todayTexthead = document.getElementById("todayTexthead");

let todayTempItemsContainer = document.getElementById("todayTempItemsContainer");
let nextDayTemp = document.getElementById("nextDayTemp");
let nextWeekDay = document.getElementById("nextWeekDay");
let nextDate = document.getElementById("nextDate");

let comingDaysContainer = document.getElementById("comingDaysContainer");

function addNextDayItem(upcomingDate, weekDayName, weekTemp) {


    let nextDayItem = document.createElement('div');
    nextDayItem.classList.add("d-flex", "flex-row", "align-items-center", "justify-content-center", "mb-2");
    comingDaysContainer.appendChild(nextDayItem);

    let cloudImage = document.createElement("h5");
    cloudImage.textContent = "⛅";
    nextDayItem.appendChild(cloudImage);

    let nextTemp = document.createElement('h6');
    nextTemp.classList.add("pl-2");
    nextTemp.textContent = weekTemp + "C";
    nextDayItem.appendChild(nextTemp);

    let nextWeekName = document.createElement("h6");
    nextWeekName.classList.add("pl-2");
    nextWeekName.textContent = weekDayName;
    nextDayItem.appendChild(nextWeekName);

    let nextDateName = document.createElement("h6");
    nextDateName.classList.add("pl-2");
    nextDateName.textContent = upcomingDate;
    nextDayItem.appendChild(nextDateName);

}

function displayNextDays(dailyForecasts) {
    let listOfDays = Object.keys(dailyForecasts).slice(0, 5);
    for (let eachItem of listOfDays) {
        let upcomingDate = eachItem;
        let weekDayName = dailyForecasts[eachItem].day;
        let weekTemp = dailyForecasts[eachItem].temp;
        addNextDayItem(upcomingDate, weekDayName, weekTemp);
    }
}

function nextFiveDays(jsonData) {
    let lat = jsonData.coord.lat;
    let lon = jsonData.coord.lon;

    let options = {
        method: "GET"
    };
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d28274b5fe592e1f1e558103a5e66370&units=metric";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(nextDays) {
            let dailyForecasts = {};
            for (let eachItem of nextDays.list) {
                let date = eachItem.dt_txt.split(" ")[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        temp: eachItem.main.temp.toFixed(1),
                        icon: eachItem.weather[0].icon,
                        day: new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long'
                        })
                    };
                }
            }
            displayNextDays(dailyForecasts);

        });

}

function newtodayTempItem(eachTodayItem) {
    let todayItem = document.createElement('div');
    todayItem.classList.add("today", "d-flex", "flex-column", "justifi-content-between", "p-3");
    todayTempItemsContainer.appendChild(todayItem);

    let todayTime = document.createElement('h6');
    todayTime.textContent = "Today " + eachTodayItem.dt_txt.split(" ")[1].slice(0, 5);
    todayItem.classList.add("text-center");
    todayItem.appendChild(todayTime);

    let sunImage = document.createElement('h2');
    sunImage.textContent = "⛅";
    todayItem.appendChild(sunImage);

    let tempDegree = document.createElement('h6');
    tempDegree.classList.add("text-center");
    tempDegree.textContent = eachTodayItem.main.temp;
    todayItem.appendChild(tempDegree);
}


function getTodayTempDetails(jsonData) {
    let lat = jsonData.coord.lat;
    let lon = jsonData.coord.lon;

    let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d28274b5fe592e1f1e558103a5e66370&units=metric";

    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let todayForecasts = [];
            let todayDate = new Date().toISOString().split("T")[0];
            for (let eachItem of jsonData.list) {
                if (eachItem.dt_txt.includes(todayDate)) {
                    todayForecasts.push(eachItem);
                }
            }
            for (let eachtodayItem of todayForecasts) {
                newtodayTempItem(eachtodayItem);
            }
        });
}

function getPollutionDetails(jsonData) {
    let lat = jsonData.coord.lat;
    let lon = jsonData.coord.lon;

    let options = {
        method: "GET"
    };
    let url = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=d28274b5fe592e1f1e558103a5e66370";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(pollution) {
            let pollutionDetails = pollution.list[0].components;
            coPercentage.textContent = pollutionDetails.co;
            so2Percentage.textContent = pollutionDetails.so2;
            o3Percentage.textContent = pollutionDetails.o3;
            no2Percentage.textContent = pollutionDetails.no2;
        });
}

function dateFormat(timestamp) {
    const date = new Date(timestamp * 1000);
    let formattDateTime = date.toLocaleString();

    return formattDateTime;
}

function getWeatherDetails(jsonData) {
    if (jsonData.message === "city not found") {
        alert("Enter a valid city name");
        searchInput.value = "";
    } else {
        todayTexthead.classList.add("d-none");
        cityName.textContent = jsonData.name;
        tempCel.textContent = jsonData.main.temp;
        skyDescription.textContent = jsonData.weather[0].description;
        humidity.textContent = jsonData.main.humidity;
        pressure.textContent = jsonData.main.pressure;
        feelsLike.textContent = jsonData.main.feels_like;
        visibility.textContent = jsonData.visibility;

        let dateTime = dateFormat(jsonData.dt).split(",");
        dateEl.textContent = dateTime[0];
        timeEl.textContent = dateTime[1];

        let sunrise = dateFormat(jsonData.sys.sunrise).split(",");
        sunriseEl.textContent = sunrise[1].slice(0, 6);

        let sunset = dateFormat(jsonData.sys.sunset).split(",");
        sunsetEl.textContent = sunset[1].slice(0, 6);
        getPollutionDetails(jsonData);
        getTodayTempDetails(jsonData);
        nextFiveDays(jsonData);
    }
}




function fetching() {
    let options = {
        method: "GET"
    };
    let city = searchInput.value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d28274b5fe592e1f1e558103a5e66370&units=metric";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            getWeatherDetails(jsonData);
        });

}
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        todayTempItemsContainer.textContent = "";
        comingDaysContainer.textContent = "";
        fetching();
    }
})