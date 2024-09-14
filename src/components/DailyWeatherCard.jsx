import React, { useEffect, useState } from "react";
import { ICON_MAP } from "../services/ICON_MAP.js";
export function DailyWeatherCard({ temperature, icon, time }) {
  const [currentIcon, setCurrentIcons] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    getIconUrl(icon);
    setCurrentTime(
      new Date(time * 1000)
        .toLocaleDateString([], { weekday: "long" })
        .split("", 3)
    );
  });
  function getIconUrl(iconCode) {
    const icon = `/${ICON_MAP.get(iconCode)}.svg`;
    setCurrentIcons(icon);
  }

  return (
    <>
      <div className="container-fluid text-center my-4">
        <div className="row">
          <div className="col-12">
            <span className="fs-5 text-light">{temperature.toFixed()}°F</span>
          </div>
          <div className="col-12 card-height d-flex align-items-center justify-content-center">
            <img src={currentIcon} className="img-fluid" alt="" />
          </div>
          <div className="col-12">
            <span className="fs-5 text-light">{currentTime}</span>
          </div>
        </div>
      </div>
    </>
  );
}
