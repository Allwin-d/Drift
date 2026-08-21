import axios from "axios";
import type { getWeatherType } from "./weather.types.js";

const getWeather = async (lat: number, lng: number) => {
  const OPEANWEATHER_API_KEY = process.env.OPEANWEATHER_API_KEY;
  const WEATHER_DATA_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPEANWEATHER_API_KEY}&units=metric`;
  try {
    const response = await axios.get<getWeatherType>(WEATHER_DATA_API);
    const weather = response.data;
    console.log("Weather Data Response : ", weather);
    if (!weather) {
      throw new Error("Weather data not availabe");
    }
    return weather;
  } catch (err) {
    throw new Error("Failed to fetch Weather Data ");
  }
};

export default getWeather;
