import { useEffect, useState } from "react";
import "./result.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "8cfd2034b5d8233e10503d1d061f72d8";

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        setWeatherData(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <div className="resultContainer">Loading...</div>;
  }

  if (error) {
    return <div className="resultContainer">{error}</div>;
  }

  return (
    <div className="resultContainer">
      {weatherData && (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
}
