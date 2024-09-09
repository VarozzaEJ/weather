import logo from "../assets/img/rainy-day.png";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export function MainPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-8 d-flex justify-content-center">
            <img src={logo} alt="" className="img-fluid" />
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <h1 className="text-center text-light fw-bold">87 degrees</h1>
          <div className="col-6 d-flex justify-content-between justify-content-md-center">
            <span className="fs-3 text-light pe-md-4">Low: 65</span>
            <span className="fs-3 text-light">High: 90</span>
          </div>
        </div>
      </div>
    </>
  );
}
