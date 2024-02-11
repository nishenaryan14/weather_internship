import { useEffect, useState } from "react";
import { Hero } from "../../components/hero/Hero";
import "./home.css";
import Summary from "../../components/summary/Summary";
import { RenderCityGraph } from "../detail/Detail";
import { fetchWeatherDataForRecentCities } from "../../apiCalls";

const Home = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const result = async () => {
      const res = await fetchWeatherDataForRecentCities(recentSearches);
      setData(res);
    };
    result();
  }, [recentSearches]);
  return (
    <div className="home">
      <section className="homeTop" id="s">
        <Hero
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
        />
      </section>
      <div className="recentSearchesGraph" id="recents">
        <p className="heading">Recent Searches</p>
        {recentSearches && <RenderCityGraph cityData={data} />}
      </div>
      <section className="stateSummary" id="state-summary">
        <Summary />
      </section>
    </div>
  );
};

export default Home;
