// RenderGraph.jsx
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./rendergraph.css"; // Import CSS for styling

const RenderGraph = ({ stateData }) => {
  const { main, name } = stateData;
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    renderChart();
  }, [stateData]);

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Temperature", "Pressure", "Max Temp"], // Adjust labels as needed
        datasets: [
          {
            label: name, // Use state name as label
            data: [main?.temp, main?.pressure, main?.temp_max], // Adjust data as needed
            backgroundColor:
              main?.temp > 300
                ? "rgba(255, 99, 132, 0.2)"
                : "rgba(54, 162, 235, 0.2)", // Adjust color based on temperature
            borderColor:
              main?.temp > 300
                ? "rgba(255, 99, 132, 1)"
                : "rgba(54, 162, 235, 1)", // Adjust border color based on temperature
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
    <div className="graphParent">
      <canvas className="canvas" ref={chartRef}></canvas>
    </div>
  );
};

export default RenderGraph;
