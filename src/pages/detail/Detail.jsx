import { useParams } from "react-router-dom";
import { fetchWeatherDataForCities } from "../../apiCalls";
import { useRef, useEffect, useState } from "react";
import "./detail.css";
import Chart from "chart.js/auto";
import { LineGraph } from "../../components/lineGraph/LineGraph";
export const RenderCityGraph = ({ cityData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    renderChart();
  }, [cityData]);

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cityData?.map((city) => city.name),
        datasets: [
          {
            label: "Temperature",
            data: cityData?.map((city) => city.main.temp),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Humidity",
            data: cityData.map((city) => city.main.humidity),
            backgroundColor: "olive",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Wind Degree",
            data: cityData.map((city) => city.wind.deg),
            backgroundColor: "purple",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.parsed.y || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  };

  return (
    <div className="chartParent">
      <canvas className="canvas" ref={chartRef}></canvas>
    </div>
  );
};

const Detail = () => {
  const [cityData, setCityData] = useState([]);

  const { state } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const weatherDataForCities = await fetchWeatherDataForCities(state);
      setCityData(weatherDataForCities);
      console.log(weatherDataForCities);
    };
    fetchData();
  }, []);
  return (
    <div className="detailContainer">
      <div className="detailTop">
        <p className="stateName">{state}</p>
        <div className="detailGraph">
          <RenderCityGraph cityData={cityData} />
        </div>
      </div>
      <div className="detailBottom">
        <LineGraph city={cityData} />
        <p className="detailBottom">LINE GRAPH</p>
      </div>
    </div>
  );
};
export default Detail;
