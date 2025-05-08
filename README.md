
# 🌦️ Weather App

A responsive web application that displays current weather, air pollution levels, and forecasts using data from the OpenWeatherMap API.

## 📸 Preview

![Weather App Screenshot](https://res.cloudinary.com/dcble6mbv/image/upload/v1746723517/weather%20app.png)

## 🚀 Features

- 🌇 Current weather (temp, humidity, feels like, pressure)
- 🕒 Real-time sunrise/sunset & visibility
- 🌡️ Today's hourly temperature forecast
- 📅 5-day weather forecast
- 🏭 Air pollution data (CO, SO₂, O₃, NO₂)
- 🔍 City search with keyboard support (Enter key)

## 🛠️ Tech Stack

- **HTML** – Markup structure
- **CSS** – UI styling & layout
- **JavaScript** – Logic, APIs, DOM handling
- **OpenWeatherMap API** – Weather and pollution data

## 📂 File Structure

```
weather-app/
│
├── index.html         # Main HTML page
├── styles.css         # All styling
└── script.js          # JavaScript logic
```

## 🔑 API Endpoints Used

- `https://api.openweathermap.org/data/2.5/weather?q={city}`
- `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}`
- `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}`

> API Key Used: `d28274b5fe592e1f1e558103a5e66370`

## 🧠 Core JavaScript Functions

| Function | Purpose |
|----------|---------|
| `fetching()` | Main city weather data fetcher |
| `getWeatherDetails()` | Populates UI with current weather |
| `getPollutionDetails()` | Loads air pollution details |
| `getTodayTempDetails()` | Loads today's forecast by hour |
| `nextFiveDays()` | Loads upcoming 5-day forecast |

## 📌 How to Use

1. Clone the repository.
2. Open `index.html` in a browser.
3. Enter a city and press **Enter**.
4. View weather, forecast, and pollution info.

