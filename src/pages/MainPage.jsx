import { HourlyWeather } from "../components/HourlyWeather.jsx";
import Icon from "@mdi/react";
import {
  mdiDotsHexagon,
  mdiLoading,
  mdiMapMarker,
  mdiWeatherSunny,
  mdiWeatherSunsetUp,
} from "@mdi/js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop.js";
import React from "react";
import { ICON_MAP } from "../services/ICON_MAP.js";
import * as motion from "framer-motion/client";
import { DailyWeatherCard } from "../components/DailyWeatherCard.jsx";
export function MainPage() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState("");
  const [airData, setAirData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");

  useEffect(() => {
    openModal();
  }, []);

  const openModal = () => {
    Modal.getOrCreateInstance("#chooseLocationModal").show();
  };

  function getIconUrl(iconCode) {
    const icon = `/${ICON_MAP.get(iconCode)}.svg`;
    setIcon(icon);
  }

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        event.preventDefault();
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`
          )
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            getIconUrl(response.data.weather[0].icon);
            Modal.getOrCreateInstance("#chooseLocationModal").hide();
            Pop.toast("Location Changed", "success", "top-end", 2000);

            axios
              .get(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${response.data.coord.lat}&longitude=${response.data.coord.lon}1&hourly=pm10,pm2_5`
              )
              .then((airQualityResponse) => {
                setAirData(airQualityResponse.data);
                console.log("🌪️", airQualityResponse.data);
                Modal.getOrCreateInstance("#chooseLocationModal").hide();
              });
            axios
              .get(
                `https://api.open-meteo.com/v1/forecast?latitude=${response.data.coord.lat}&longitude=${response.data.coord.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FDenver&forecast_days=7`
              )
              .then((weatherDataResponse) => {
                setWeatherData(weatherDataResponse.data);
                console.log("🌞", weatherDataResponse.data);
                const correctSunriseTime =
                  weatherDataResponse.data.daily.sunrise[0] * 1000;
                const sunrise = new Date(correctSunriseTime).toLocaleTimeString(
                  [],
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                );
                setSunriseTime(sunrise);

                const correctSunsetTime =
                  weatherDataResponse.data.daily.sunset[0] * 1000;
                const sunset = new Date(correctSunsetTime).toLocaleTimeString(
                  [],
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                );
                setSunsetTime(sunset);
                Modal.getOrCreateInstance("#chooseLocationModal").hide();
              });
          });
      } catch (error) {
        Pop.error("Please enter a valid location");
        console.error(error);
      }

      setLocation("");
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="d-flex flex-column justify-content-start ">
          <div>
            <div className="row mt-5 d-flex flex-column align-items-center justify-content-center">
              {data.main ? (
                <div className="col-3 sticky-top col-md-7 d-flex justify-content-center text-light fs-1 fw-bold">
                  <span className="city-text">{data.name}</span>
                </div>
              ) : null}
              {data.main ? (
                <div className="col-8 d-flex justify-content-center">
                  <img
                    src={icon}
                    alt=""
                    height={350}
                    width={350}
                    className=""
                  />
                </div>
              ) : (
                <div className="col-12 d-flex justify-content-center">
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
                </div>
              )}
            </div>
            <div className="row d-flex justify-content-center">
              {data.main ? (
                <h1 className="text-center text-light fw-bold">
                  {((data.main.temp - 273.15) * 1.8 + 32).toFixed()}
                  <span className="">°F</span>
                </h1>
              ) : null}

              {data.main && (
                <div className="col-8 mb-3 d-flex justify-content-between justify-content-md-center">
                  <span className="fs-3 d-flex text-white-50 pe-md-4">
                    Low: {((data.main.temp_min - 273.15) * 1.8 + 32).toFixed()}
                    <p className=" mb-0">°F</p>
                  </span>
                  <span className="fs-3 d-flex text-white-50">
                    High: {((data.main.temp_max - 273.15) * 1.8 + 32).toFixed()}
                    <p className=" mb-0">°F</p>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            {weatherData.daily ? (
              <HourlyWeather data={weatherData} UTCOffset={data.timezone} />
            ) : null}
            {weatherData.daily && airData.hourly ? (
              <div className="container my-4 ">
                <div className="row">
                  <div className="col-12 ps-2">
                    <span className="fs-2 text-light fw-bold">
                      7 Day Forecast
                    </span>
                  </div>
                </div>
                <div className="row d-flex overflow-x-scroll flex-nowrap ">
                  {weatherData.daily.temperature_2m_max.map((temp, index) => (
                    <div className="col-md-3 col-4 bg-smokey mx-1 rounded shadow-lg ">
                      <DailyWeatherCard
                        key={temp}
                        temperature={
                          weatherData.daily.temperature_2m_max[index]
                        }
                        icon={weatherData.daily.weather_code[index]}
                        time={weatherData.daily.time[index]}
                      />
                    </div>
                  ))}
                </div>
                <div className="row my-4 bg-smokey rounded">
                  <div className="col-12 mt-2">
                    <span className="text-white-50 fs-6">
                      <Icon
                        path={mdiDotsHexagon}
                        title="Air Quality"
                        color="rgba(255, 255, 255, 0.5)"
                        size={1.3}
                        className="me-1"
                      />
                      Air Quality
                    </span>
                  </div>
                  <div className="col-12 mb-2 text-light">
                    {airData.hourly.pm2_5[0] < 35 ? (
                      <span className="fs-5 ">
                        {airData.hourly.pm2_5[0]} - Pollutants pose little to no
                        harm to individuals
                      </span>
                    ) : (
                      <span className="fs-5 ">
                        {airData.hourly.pm2_5[0]} - Pollutants can cause harm to
                        at risk individuals
                      </span>
                    )}
                  </div>
                </div>
                <div className="row d-flex justify-content-between justify-content-md-between">
                  <div className="col-5 col-md-5  bg-smokey rounded">
                    <div className="row">
                      <div className="col-12 text-white-50 fs-6">
                        <Icon
                          path={mdiWeatherSunsetUp}
                          title="Sunrise Time"
                          color="rgba(255,255,255,0.5"
                          size={1.3}
                          className="me-1"
                        />
                        Sunrise
                      </div>
                      {sunriseTime && sunsetTime ? (
                        <>
                          <div className="col-12 text-light fs-4">
                            {sunriseTime}
                          </div>
                          <div className="col-12 text-white-50 fs-6">
                            Sunset: {sunsetTime}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-5 col-md-5 bg-smokey rounded">
                    <div className="row">
                      <div className="col-12 text-white-50 fs-6">
                        <Icon
                          path={mdiWeatherSunny}
                          title="Sunrise Time"
                          color="rgba(255,255,255,0.5"
                          size={1.3}
                          className="me-1"
                        />
                        Max UV Index
                      </div>
                      {weatherData.daily &&
                      weatherData.daily.uv_index_max[0] < 2 ? (
                        <>
                          <div className="col-12 text-light fs-4">
                            {weatherData.daily.uv_index_max[0]}
                          </div>
                          <div className="col-12 text-light fs-4">Low</div>
                        </>
                      ) : null}
                      {weatherData.daily &&
                      weatherData.daily.uv_index_max[0] < 7 ? (
                        <>
                          <div className="col-12 text-light fs-4">
                            {weatherData.daily.uv_index_max[0]}
                          </div>
                          <div className="col-12 text-light fs-4">Moderate</div>
                        </>
                      ) : null}
                      {weatherData.daily &&
                      weatherData.daily.uv_index_max[0] > 7 ? (
                        <>
                          <div className="col-12 text-light fs-4">
                            {weatherData.daily.uv_index_max[0]}
                          </div>
                          <div className="col-12 text-light fs-4">High</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <footer className="container mb-2 fab">
              <div className="row d-flex justify-content-end">
                <div className="col-12 d-flex justify-content-end">
                  <motion.button
                    className="bg-transparent btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon
                      path={mdiMapMarker}
                      title="Set Location"
                      className="shadow-lg"
                      horizontal
                      vertical
                      size={2}
                      rotate={180}
                      color="white"
                      data-bs-toggle="modal"
                      data-bs-target="#chooseLocationModal"
                    />
                  </motion.button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div
        className="modal  fade"
        id="chooseLocationModal"
        tabIndex="-1"
        aria-labelledby="chooseLocationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-fixed bottom-0 end-0 start-0">
          <div className="modal-content bg-secondary">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="chooseLocationModalLabel">
                Choose A Location
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    className="form-control"
                    aria-describedby="choose location for weather data"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
