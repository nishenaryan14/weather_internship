import { useEffect, useState } from "react";
import RenderGraph from "../renderGraph/RenderGraph";
import "./summary.css";
import { fetchWeatherDataForStates } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
const Summary = () => {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const weatherDataForStates = await fetchWeatherDataForStates();
      setStateData(weatherDataForStates);
      console.log(weatherDataForStates);
    };

    fetchData();
  }, []);

  const handleClick = async (state) => {
    try {
      navigate(`/details/${state}`);
    } catch (error) {
      console.error(
        `Error fetching weather data for cities of ${stateName}`,
        error
      );
    }
  };

  return (
    <div className="summaryParent">
      <p className="summaryHeading">State Wise Summary</p>
      <div className="summaryContainer">
        {stateData.map((state) => (
          <div
            key={state.name}
            className={`summaryItem ${state.main.temp > 300 && "high"}`}
            onClick={() => handleClick(state.name)}
          >
            <p>{state.name}</p>
            <RenderGraph key={state.name} stateData={state} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
