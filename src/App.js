import React, { useState } from 'react';
import { BsThermometerHalf } from 'react-icons/bs';
import { IoWaterOutline, IoSpeedometerOutline } from 'react-icons/io5';
import { TbWind } from 'react-icons/tb';
import Loading from "./Loading";
import WeatherIcon from "./WeatherIcon";

const api = {
  baseurl: "https://api.openweathermap.org/data/2.5/",
  key: "62f8f1d3367709cc9825dcc94b0dc0f4",
};

function App() {
  const [loading,setLoading] = useState(false);
  const [query,setQuery] = useState("");
  const [weather,setWeather] = useState({});

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return (`${day}, ${date} ${month}, ${year}`);
  }

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`);
      const data = await response.json();
      setLoading(false);
      setWeather(data);
      setQuery("");
      console.log(data);
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  if(loading) {
    return (
      <main className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18) ? "warm" : "") : ""}>
        <section className="container">
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <input type="text" className="search-bar" placeholder="Search a place..." onChange={(e) => setQuery(e.target.value)} value={query} />
            </form>
          </div>
          <div className="data-container">
            <Loading />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18) ? "warm" : "") : ""}>
      <section className="container">
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <input autoFocus type="text" className="search-bar" placeholder="Search a place..." onChange={(e) => setQuery(e.target.value)} value={query} />
          </form>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="data-container">
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-container">
              <div className="temp">
                <BsThermometerHalf className="icon" />{Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                <WeatherIcon weather={weather.weather[0].main} />
                <p>
                  {weather.weather[0].description}
                </p>
              </div>
            </div>
            <div className="other-container">
              <div className="humid">
                <IoWaterOutline className="icon" />
                <p className="sub-text">
                  Humidity: <br /> {weather.main.humidity}%
                </p>
              </div>
              <div className="pressure">
                <IoSpeedometerOutline className="icon" />
                <p className="sub-text">
                  Pressure: <br /> {weather.main.pressure} hPa
                </p>
              </div>
              <div className="speed">
                <TbWind className="icon" />
                <p className="sub-text">
                  Wind: <br /> {Math.round((weather.wind.speed)*3.6)} km/h
                </p>
              </div>
            </div>
          </div>
        ) : ("")}
        </section>
    </main>
  );
}

export default App;
