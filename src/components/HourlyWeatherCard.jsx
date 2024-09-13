import React, { useEffect, useState } from "react";
import { ICON_MAP } from "../services/ICON_MAP.js";

export function HourlyWeatherCard({
  time = "12:00 PM",
  temperature = null,
  icon,
}) {
  const [currentIcon, setCurrentIcons] = useState("");
  let [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(icon);
    getIconUrl(icon);
  }, [icon]);

  function getIconUrl(iconCode) {
    const icon = `/${ICON_MAP.get(iconCode)}.svg`;
    setCurrentIcons(icon);
  }

  return (
    <>
      <div className="d-flex flex-column mb-3">
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
    </>
  );
}
