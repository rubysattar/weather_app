import React, { useState } from 'react';
import './App.css';

// import api from './.env';
const api = {
  key: "2ebb9995ba6eddac9d28da01725e0dce",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className ="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search by city name..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {/* need a check before we can access weather.sys.country */}
        {(typeof weather.main != "undefined")? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp * 1.8 + 32)}° F
              </div>
              <div className="weather">
                Feels like: {Math.round(weather.main.feels_like * 1.8 + 32)}°F <br></br>
                {weather.weather[0].description} <br></br>
                High: {Math.round(weather.main.temp_max *1.8+32)}°F <br></br>
                Low: {Math.round(weather.main.temp_min *1.8+32)}°F
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
