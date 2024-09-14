import React, { useEffect } from "react";
export function DailyWeatherCard({ temperature, icon, time }) {
  useEffect(() => {
    console.log(temperature, icon, time);
  });
  return (
    <>
      <div className="container-fluid text-center my-4">
        <div className="row">
          <div className="col-12">
            <span className="fs-5 text-light">76 F</span>
          </div>
          <div className="col-12 card-height d-flex align-items-center justify-content-center">
            <img src="/cloudy.svg" className="img-fluid" alt="" />
          </div>
          <div className="col-12">
            <span className="fs-5 text-light">Thur</span>
          </div>
        </div>
      </div>
    </>
  );
}
