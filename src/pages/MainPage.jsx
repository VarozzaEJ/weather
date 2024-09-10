import logo from "../assets/img/rainy-day.png";
import { HourlyWeather } from "../components/HourlyWeather.jsx";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";

export function MainPage() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    openModal;
  });

  const openModal = () => {
    Modal.getOrCreateInstance("#exampleModal").show();
  };

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`
          )
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            Modal.getOrCreateInstance("#exampleModal").hide();
          });
      } catch (error) {
        Pop.error("Please enter a valid location");
      }

      setLocation("");
    }
  };

  return (
    <>
      <div className="container-fluid full-vh">
        <div className="d-flex flex-column justify-content-between full-vh">
          <div>
            <div className="row mt-5 d-flex justify-content-center">
              <div className="col-8 d-flex justify-content-center">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              {data.main ? (
                <h1 className="text-center text-light fw-bold">
                  {((data.main.temp - 273.15) * 1.8 + 32).toFixed()}
                  <span className="ms-1">F°</span>
                </h1>
              ) : null}

              {data.main && (
                <div className="col-8 d-flex justify-content-between justify-content-md-center">
                  <span className="fs-3 d-flex text-light pe-md-4">
                    Low: {((data.main.temp_min - 273.15) * 1.8 + 32).toFixed()}
                    <p className="ms-1 mb-0">F°</p>
                  </span>
                  <span className="fs-3 d-flex text-light">
                    High: {((data.main.temp_max - 273.15) * 1.8 + 32).toFixed()}
                    <p className="ms-1 mb-0">F°</p>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <HourlyWeather />

            <footer className="container mb-2">
              <div className="row d-flex justify-content-center">
                <div className="col-3 d-flex justify-content-center">
                  <Icon
                    path={mdiMapMarker}
                    title="User Profile"
                    size={2}
                    horizontal
                    vertical
                    rotate={180}
                    color="white"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-fixed bottom-0 end-0 start-0">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
