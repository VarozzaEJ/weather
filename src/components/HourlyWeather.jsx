import { useEffect, useState } from "react";
import logo from "../assets/img/rainy-day.png";
import { HourlyWeatherCard } from "./HourlyWeatherCard.jsx";
import { AppState } from "../AppState.js";
import { weatherService } from "../services/WeatherService.js";
import { api } from "../services/AxiosService.js";

export function HourlyWeather() {
  const weatherData = useState(() => AppState.weather);

  return (
    <>
      <div className="container rounded shadow-lg mb-1 text-light bg-smokey">
        <div className="row">
          <div className="col-12 mb-3 border-bottom d-flex justify-content-between">
            <span className="my-1">Today</span>
            <span className="my-1">September 9</span>
          </div>
          <div className="d-flex justify-content-between justify-content-md-around">
            <HourlyWeatherCard />
            <HourlyWeatherCard />
            <HourlyWeatherCard />
            <HourlyWeatherCard />
          </div>
        </div>
      </div>
    </>
  );
}
