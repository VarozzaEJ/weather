import logo from "../assets/img/rainy-day.png";

export function HourlyWeatherCard({ time = "12:00 PM", temperature }) {
  console.log(temperature);
  return (
    <div className="d-flex flex-column">
      <span className="text-center">{Math.round(temperature)}°F</span>
      <img
        className="img-fluid"
        style={{ height: 80, width: 80 }}
        src={logo}
        alt=""
      />
      <span className="text-center my-1">{time}</span>
    </div>
  );
}

// https://api.open-meteo.com/v1/forecast?latitude=43.6135&longitude=-116.2035&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FDenver
