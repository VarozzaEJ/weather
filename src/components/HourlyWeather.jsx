import { useEffect, useState } from "react";
import { HourlyWeatherCard } from "./HourlyWeatherCard.jsx";
import { AppState } from "../AppState.js";

export function HourlyWeather() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState("");

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
