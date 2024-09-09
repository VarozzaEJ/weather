import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class WeatherService {
    async displayWeather() {
        const weather = await api.get("api/weather")
        let drilledData = weather.data.main.temp
        let fahrenheitMathdWeather = (drilledData - 273.15) * 1.8 + 32
        //(K − 273.15) × 1.8 + 32
        let superMathdWeather = Math.round(fahrenheitMathdWeather)
        AppState.temperature = superMathdWeather
    }

}
export const weatherService = new WeatherService()