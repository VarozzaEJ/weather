import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DailyWeatherCard } from "../components/DailyWeatherCard.jsx";
import Icon from "@mdi/react";
import { mdiLoading, mdiSkullCrossbones } from "@mdi/js";

export default function InfoPage() {
  const [weatherData, setWeatherData] = useState({});
  const [airData, setAirData] = useState({});

  let { lon, lat } = useParams();
  useEffect(() => {
    getData();
  }, [lat, lon]);

  const getData = async () => {
    await axios
      .get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}1&hourly=pm10,pm2_5`
      )
      .then((airQualityResponse) => {
        setAirData(airQualityResponse.data);
        console.log(airQualityResponse.data);
      });

    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FDenver`
      )
      .then((weatherDataResponse) => {
        setWeatherData(weatherDataResponse.data);
        console.log("🌞", weatherDataResponse.data);
      });
  };
  return (
    <>
      {weatherData.daily && airData.hourly ? (
        <div className="container my-4 full-vh">
          <div className="row mx-3">
            <div className="col-12 ps-2">
              <span className="fs-2 text-light fw-bold">7 Day Forecast</span>
            </div>
          </div>
          <div className="row d-flex overflow-x-scroll flex-nowrap  mx-3">
            {weatherData.daily.temperature_2m_max.map((temp, index) => (
              <div className="col-md-3 col-4 bg-smokey mx-1 daily-weather-card ">
                <DailyWeatherCard
                  key={temp}
                  temperature={weatherData.daily.temperature_2m_max[index]}
                  icon={weatherData.daily.weather_code[index]}
                  time={weatherData.daily.time[index]}
                />
              </div>
            ))}
          </div>
          <div className="row mx-3 my-4">
            <div className="col-12">
              <span className="text-light fs-6">
                <Icon
                  path={mdiSkullCrossbones}
                  title="Air Quality"
                  color="white"
                  size={1.3}
                  className="me-3"
                />
                Air Quality
              </span>
            </div>
            <div className="col-12">
              <span className="fs-2 fw-bold">{airData.hourly.pm2_5[0]}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container m-4 full-vh d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="col-12">
              <span className="fs-2 text-light fw-bold">
                <Icon
                  path={mdiLoading}
                  title="User Profile"
                  size={20}
                  spin
                  horizontal
                  vertical
                  rotate={180}
                  color="white"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
