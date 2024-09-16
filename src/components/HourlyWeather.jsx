import { useEffect, useState } from "react";
import { HourlyWeatherCard } from "./HourlyWeatherCard.jsx";
import { AppState } from "../AppState.js";
import axios from "axios";
import React from "react";
import Pop from "../utils/Pop.js";

export function HourlyWeather({ data, UTCOffset }) {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState("");
  const [weatherData, setData] = useState({});
  const [currentTimes, setCurrentTimes] = useState([]);
  const [currentTemps, setCurrentTemps] = useState([]);
  const [icons, setCurrentIcons] = useState([]);
  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[date.getMonth()];
    setMonth(month);
  }, []);

  useEffect(() => {
    if (data) {
      getSecondaryWeather();
    }
  }, [data]);

  const getSecondaryWeather = async () => {
    try {
      const currentTime = data.hourly.time.filter(
        (hour) => hour > data.current.time
      );

      const correctIndex = data.hourly.time.findIndex(
        (hour) => hour > data.current.time
      );
      const updatedCurrentTime = currentTime.map((hour) =>
        new Date(hour * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );

      const currentTemp = data.hourly.temperature_2m.splice(
        correctIndex,
        data.hourly.temperature_2m.length - correctIndex
      );

      const correctIcons = data.hourly.weather_code.splice(
        correctIndex,
        data.hourly.weather_code.length - correctIndex
      );
      setCurrentIcons(correctIcons);
      setCurrentTemps(currentTemp);
      setCurrentTimes(updatedCurrentTime);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <>
      <div className="glow relative">
        <div className="container rounded shadow-lg mb-1 text-light bg-smokey">
          <div className="row">
            <div className="col-12 mb-3 border-bottom d-flex justify-content-between">
              <span className="my-1 text-white-50">Today</span>

              <span className="my-1 ">
                {month} {date.getDate()}
              </span>
            </div>
            {icons ? (
              <div className="d-flex justify-content-between justify-content-md-around">
                <HourlyWeatherCard
                  time={currentTimes[0]}
                  temperature={data.hourly.temperature_2m[0]}
                  icon={icons[0]}
                />
                <HourlyWeatherCard
                  time={currentTimes[1]}
                  temperature={data.hourly.temperature_2m[1]}
                  icon={icons[1]}
                />
                <HourlyWeatherCard
                  time={currentTimes[2]}
                  temperature={data.hourly.temperature_2m[2]}
                  icon={icons[2]}
                />
                <HourlyWeatherCard
                  time={currentTimes[3]}
                  temperature={data.hourly.temperature_2m[3]}
                  icon={icons[3]}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
