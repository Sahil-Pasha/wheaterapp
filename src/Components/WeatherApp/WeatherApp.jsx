import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import { API_KEY } from "../../Constant/constant";
import searchIcon from "../Assets/search.png";
import humidityIcon from "../Assets/humidity.png";
import drizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import windIcon from "../Assets/wind.png";

const WheatherApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [mainCloudIcon, setMainCloudIcon] = useState(cloudIcon);
  const [error, setError] = useState(null);

  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=Metric&appid=${API_KEY}`;

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        setWeatherData(null);
        throw new Error(
          "Please check the spelling of the city Name or Weather data not found for the given location"
        );
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
      setSearchQuery("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = () => {
    getWeatherData();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeatherData();
    }
  };

  useEffect(() => {
    if (weatherData) {
      if (
        weatherData?.weather[0].icon === "01d" ||
        weatherData?.weather[0].icon === "01n"
      ) {
        setMainCloudIcon(clearIcon);
      } else if (
        weatherData?.weather[0].icon === "02d" ||
        weatherData?.weather[0].icon === "02n"
      ) {
        setMainCloudIcon(cloudIcon);
      } else if (
        weatherData?.weather[0].icon === "03d" ||
        weatherData?.weather[0].icon === "03n"
      ) {
        setMainCloudIcon(drizzleIcon);
      } else if (
        weatherData?.weather[0].icon === "04d" ||
        weatherData?.weather[0].icon === "04n"
      ) {
        setMainCloudIcon(drizzleIcon);
      } else if (
        weatherData?.weather[0].icon === "09d" ||
        weatherData?.weather[0].icon === "09n"
      ) {
        setMainCloudIcon(rainIcon);
      } else if (
        weatherData?.weather[0].icon === "10d" ||
        weatherData?.weather[0].icon === "10n"
      ) {
        setMainCloudIcon(rainIcon);
      } else if (
        weatherData?.weather[0].icon === "13d" ||
        weatherData?.weather[0].icon === "13n"
      ) {
        setMainCloudIcon(snowIcon);
      } else {
        setMainCloudIcon(clearIcon);
      }
    }
  }, [weatherData]);

  return (
    <div className="container">
      <div className="topBar">
        <input
          className="cityInput"
          type="text"
          placeholder="Enter the city Name..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div
          className="searchIcon"
          onClick={() => {
            handleSearch();
          }}
        >
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      {weatherData && weatherData ? (
        <>
          <div className="weatherImage">
            <img src={mainCloudIcon} alt="Cloud Icon" />
          </div>
          <div className="weatherTemp">
            {Math.floor(weatherData?.main.temp)}°C
          </div>
          <div className="weatherLocation">{weatherData?.name}</div>
          <div className="dataContainer">
            <div className="element">
              <img src={humidityIcon} alt="humidity Icon" className="icon" />
              <div className="data">
                <div className="humidityPercentage">
                  {weatherData?.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={windIcon} alt="Wind Icon" className="icon" />
              <div className="data">
                <div className="humidityPercentage">
                  {Math.floor(weatherData?.wind.speed)}km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="dataNotAvailable">
          {error && error ? (
            <p>{error}</p>
          ) : (
            <p>
              Please Write the City Name and hit Enter or Click on Search Icon
              to see the weather Report
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WheatherApp;
