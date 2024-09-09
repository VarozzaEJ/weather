import React, { useState } from "react";
import logo from "../assets/img/rainy-day.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container my-2">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center home-page">
            <img src={logo} alt="" className="img-fluid" />
            <h1 className="text-center text-light mt-3">Weathery</h1>
            <Link className="d-flex justify-content-center" to={"Main"}>
              <button className="btn btn-warning w-75 h-100 text-center rounded-pill">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
