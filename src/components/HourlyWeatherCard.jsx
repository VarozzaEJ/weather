import logo from "../assets/img/rainy-day.png";
import React, { useEffect, useState } from "react";
import { ICON_MAP } from "../services/ICON_MAP.js";

export function HourlyWeatherCard({
  time = "12:00 PM",
  temperature = null,
  icon,
}) {
  const [currentTemps, setCurrentTemps] = useState(0);
  const [currentIcon, setCurrentIcons] = useState("");
  useEffect(() => {
    setCurrentTemps(temperature);
    getIconUrl(icon);
  }, []);

  function getIconUrl(iconCode) {
    console.log(iconCode);
    const icon = `src/assets/Icons/${ICON_MAP.get(iconCode)}.svg`;
    setCurrentIcons(icon);
  }
  return (
    <div className="d-flex flex-column">
      <span className="text-center" key={temperature}>
        {Math.round(temperature)}°F
      </span>
      <img
        className="img-fluid"
        style={{ height: 80, width: 80 }}
        src={currentIcon}
        alt=""
      />
      <span className="text-center my-1">{time}</span>
    </div>
  );
}
