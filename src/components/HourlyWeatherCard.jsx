import logo from "../assets/img/rainy-day.png";

export function HourlyWeatherCard() {
  return (
    <div className="d-flex flex-column">
      <span className="text-center">75</span>
      <img
        className="img-fluid"
        style={{ height: 80, width: 80 }}
        src={logo}
        alt=""
      />
      <span className="text-center my-1">5:00</span>
    </div>
  );
}
