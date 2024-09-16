import React, { useState } from "react";
import logo from "../assets/img/rainy-day.png";
import { Link } from "react-router-dom";
import * as motion from "framer-motion/client";

export default function HomePage() {
  const svgVariants = {
    hidden: { rotate: -360 },
    visible: {
      rotate: 0,
      transition: { duration: 15 },
    },
  };

  const pathVariants = {
    hidden: { opacity: 0.5, pathLength: 0, y: -100 },
    visible: {
      opacity: 1,
      pathLength: 1,
      y: 0,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="home-page">
      <div className="container my-2">
        <div className="row d-flex justify-content-center full-vh">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-md-center justify-content-around mb-md-0 mb-5 home-page">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <defs>
                <linearGradient
                  id="a"
                  x1="16.5"
                  y1="19.67"
                  x2="21.5"
                  y2="28.33"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fbbf24" />
                  <stop offset="0.45" stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient
                  id="b"
                  x1="22.56"
                  y1="21.96"
                  x2="39.2"
                  y2="50.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#f3f7fe" />
                  <stop offset="0.45" stopColor="#f3f7fe" />
                  <stop offset="1" stopColor="#deeafb" />
                </linearGradient>
              </defs>
              <circle
                cx="19"
                cy="24"
                r="5"
                stroke="#f8af18"
                strokeMiterlimit="10"
                strokeWidth="0.5"
                fill="url(#a)"
              />
              {/* This is the animatable sunshine */}
              <motion.path
                variants={svgVariants}
                initial="hidden"
                animate="visible"
                d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33"
                fill="none"
                stroke="#fbbf24"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <motion.path
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
                stroke="#e6effc"
                strokeMiterlimit="10"
                strokeWidth="0.5"
                fill="url(#b)"
              />
            </svg>
            <div>
              <h1 className="text-center text-light mt-3">Weathery</h1>
              <Link className="d-flex justify-content-center" to={"Main"}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-warning w-75 h-100 text-center rounded-pill"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
