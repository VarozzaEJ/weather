import { useEffect, useState } from "react";
import { HourlyWeatherCard } from "./HourlyWeatherCard.jsx";
import { AppState } from "../AppState.js";
import axios from "axios";
import Pop from "../utils/Pop.js";

export function HourlyWeather({ data }) {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState("");
  const [weatherData, setData] = useState({});
  const [currentTimes, setCurrentTimes] = useState([]);
  const [currentTemps, setCurrentTemps] = useState([]);

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
  }, []);

  const getSecondaryWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FDenver&forecast_days=1`
      );
      setData(response.data);
      console.log(response.data);

      const currentTime = response.data.hourly.time.filter(
        (hour) => hour > response.data.current.time
      );
      const currentTimeIndex = response.data.hourly.time.findIndex(
        (hour) => hour > response.data.current.time
      );

      const updatedCurrentTime = currentTime.map((hour) =>
        new Date(hour * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      const currentWeather = response.data.hourly.temperature_2m.splice(
        0,
        currentTimeIndex
      );
      console.log(currentWeather);
      setCurrentTemps(currentWeather);
      setCurrentTimes(updatedCurrentTime);
    } catch (error) {
      Pop.error(error);
    }
  };
  return (
    <>
      <div className="container rounded shadow-lg mb-1 text-light bg-smokey">
        <div className="row">
          <div className="col-12 mb-3 border-bottom d-flex justify-content-between">
            <span className="my-1">Today</span>

            <span className="my-1">
              {month} {date.getDate()}
            </span>
          </div>
          {currentTimes ? (
            <div className="d-flex justify-content-between justify-content-md-around">
              <HourlyWeatherCard
                time={currentTimes[0]}
                temperature={currentTemps[0]}
              />
              <HourlyWeatherCard
                time={currentTimes[1]}
                temperature={currentTemps[1]}
              />
              <HourlyWeatherCard
                time={currentTimes[2]}
                temperature={currentTemps[2]}
              />
              <HourlyWeatherCard
                time={currentTimes[3]}
                temperature={currentTemps[3]}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
