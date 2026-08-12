import axios from "axios";
import type { getWeatherType } from "./weather.types.js";

const getWeather = async (lat: number, lng: number) => {
  const OPENWEATHER_API_KEY = process.env.OPEANWEATHER_API_KEY;
  const WEATHER_DATA_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`;
  try {
    const response = await axios.get<getWeatherType>(WEATHER_DATA_API);
    const weather = response.data;
    if (!weather) {
      throw new Error("Weather data not availabe");
    }
    return weather;
  } catch (err) {
    console.error("Failed to fetch weather Data : ", err);
    throw err;
  }
};

export default getWeather;
