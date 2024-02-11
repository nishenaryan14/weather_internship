import { useEffect, useState } from "react";
import "./result.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { city } = useParams();
  const { unit } = useParams();
  const [units, setUnits] = useState(unit?.split("=")[1]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "8cfd2034b5d8233e10503d1d061f72d8";

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        );
        setUnits(unit);
        setWeatherData(res.data);
        setLoading(false);
        console.log(unit);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, unit]);

  if (loading) {
    return <div className="resultContainer">Loading...</div>;
  }

  if (error) {
    return <div className="resultContainer">{error}</div>;
  }

  return (
    <div className="resultContainer">
      {weatherData && (
        <div className="result">
          <h2>{weatherData.name}</h2>
          <p>
            Temperature:{" "}
            <span className="weatherResult">{weatherData.main.temp}</span>{" "}
            <span>{units === "metric" ? "°C" : "F"}</span>
          </p>
          <p>
            Weather:{" "}
            <span className="weatherResult">
              {weatherData.weather[0].description}
            </span>
          </p>
          <p>
            Humidity:{" "}
            <span className="weatherResult">{weatherData.main.humidity}%</span>
          </p>
          <p>
            Wind Speed:{" "}
            <span className="weatherResult">{weatherData.wind.speed} m/s</span>
          </p>
        </div>
      )}
    </div>
  );
}
