import "./linegraph.css";
import Chart from "chart.js/auto";
import { lineChartData } from "../../dummyData/data";
import { useEffect, useRef } from "react";

export const LineGraph = ({ city }) => {
  const { city1, city2, city3, city4, city5 } = lineChartData;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    renderChart();
  }, []);

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"], // Assuming day-wise labels
        datasets: [
          {
            label: city[0]?.name,
            data: city1,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: city[1]?.name,
            data: city2,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: city[2]?.name,
            data: city3,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
          },
          {
            label: city[3]?.name,
            data: city4,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: city[4]?.name,
            data: city5,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas className="lineGraph" ref={chartRef}></canvas>;
};
