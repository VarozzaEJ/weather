import logo from "../assets/img/rainy-day.png";
import React, { useEffect, useState } from "react";

export function HourlyWeatherCard({ time = "12:00 PM", temperature = null }) {
  const [currentTemps, setCurrentTemps] = useState(0);
  useEffect(() => {
    setCurrentTemps(temperature);
  }, []);
  return (
    <div className="d-flex flex-column">
      <span className="text-center" key={temperature}>
        {Math.round(temperature)}°F
      </span>
      <img
        className="img-fluid"
        style={{ height: 80, width: 80 }}
        src={logo}
        alt=""
      />
      <span className="text-center my-1">{time}</span>
    </div>
  );
}
