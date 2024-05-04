import { useEffect,useState } from 'react';
import React from 'react';
import './WeatherApp.css';

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";

const WeatherApp = () => {
  let api_key = "6abf8215086db0bd308a833a59707b0f";
  const [wicon,setwicon]=useState(cloud_icon);
  useEffect(() => {
      const search = async () => {
          const element = document.getElementsByClassName("cityInput");
          if (element.length > 0 && element[0].value !== '') {
              let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
              let response = await fetch(url);
              let data = await response.json();
              console.log(data);
              const humidity = document.getElementsByClassName("humidity-percent")[0];
              const wind = document.getElementsByClassName("wind-rate")[0];
              const temperature = document.getElementsByClassName("weather-temp")[0];
              const location = document.getElementsByClassName("weather-location");
              
              if (humidity) humidity.innerHTML = data.main.humidity + "%";
              if (wind) wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
              if (temperature) temperature.innerHTML = Math.floor(data.main.temp) + "°C";
              if (location) location.innerHTML = data.name;
              if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
                  setwicon(clear_icon)
              }
              else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
                  setwicon(cloud_icon);
              }
              else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
                  setwicon(drizzle_icon);
              }
              else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
                  setwicon(drizzle_icon);
              }
              else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
                  setwicon(rain_icon);
              }
              else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
                  setwicon(rain_icon);
              }
              else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
                  setwicon(snow_icon);
              }
              else{
                  setwicon(clear_icon)
              }
              

              element[0].value="";
          }
      };

      document.getElementsByClassName("search-icon")[0].addEventListener("click", search);
      return () => {
        document.getElementsByClassName("search-icon")[0].removeEventListener("click", search);
    };
   }, []);

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="search"/>
            <div className="search-icon">
                <img src={search_icon} alt=""/>
            </div>
        </div> 
        <div className="weather-image">
           <img src={cloud_icon} alt=""/>
        </div> 
        <div className="weather-temp">24c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon"/>
            <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
            </div>
            <div className="element">
            <img src={wind_icon} alt="" className="icon"/>
            <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default WeatherApp;