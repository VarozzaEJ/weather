import React, { useEffect } from "react";
export function DailyWeatherCard({ temperature, icon, time }) {
  useEffect(() => {
    console.log(temperature, icon, time);
  });
  return (
    <>
      <h1>Hallo</h1>
    </>
  );
}
