import React, { useEffect, useState } from "react";
import { ICON_MAP } from "../services/ICON_MAP.js";
import { section } from "framer-motion/client";
import * as motion from "framer-motion/client";
export function HourlyWeatherCard({
  time = "12:00 PM",
  temperature = null,
  icon,
}) {
  const [currentIcon, setCurrentIcons] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

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
        {/* {currentIcon !== "" ? (
          <img
            className="img-fluid"
            style={{ height: 80, width: 80 }}
            src={currentIcon}
            alt=""
          />
        ) : (
          <motion.section>
            <div className="hour-card-img"></div>
          </motion.section>
        )} */}
        <div className={`${pulsing ? "pulse" : ""} loadable`}>
          <motion.img
            initial={{ height: "2rem", opacity: 0 }}
            // style={{ height: imageLoading ? "6rem" : "auto" }}
            animate={{
              height: imageLoading ? "2rem" : "auto",
              opacity: imageLoading ? 0 : 1,
            }}
            transition={
              ({ height: { delay: 0, duration: 0.4 } },
              { opacity: { delay: 0.5, duration: 0.4 } })
            }
            onLoad={imageLoaded}
            src={currentIcon}
          />
        </div>
        <span className="text-center my-1">{time}</span>
      </div>
    </>
  );
}
