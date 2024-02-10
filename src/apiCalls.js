import axios from "axios";
import { states } from "../src/dummyData/data";

const fetchWeatherData = async (stateName) => {
  const API_KEY = "8cfd2034b5d8233e10503d1d061f72d8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stateName}&appid=${API_KEY}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchWeatherDataForStates = async () => {
  try {
    const promises = states.map((state) => fetchWeatherData(state.name));
    const responses = await Promise.all(promises);
    return responses.filter((data) => data !== null);
  } catch (error) {
    console.error("Error fetching weather data for states:", error);
    return [];
  }
};

export const fetchWeatherDataForCities = async (stateName) => {
  try {
    const state = states.find((s) => s.name === stateName);
    if (state) {
      const promises = state.cities.map((city) => fetchWeatherData(city));
      const responses = await Promise.all(promises);
      return responses.filter((data) => data !== null);
    } else {
      console.error(`State ${stateName} not found`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching weather data for cities of ${stateName}`,
      error
    );
    return [];
  }
};
