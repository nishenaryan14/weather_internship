import { useEffect, useState } from "react";
import { Hero } from "../../components/hero/Hero";
import "./home.css";
import Summary from "../../components/summary/Summary";

const Home = () => {
  return (
    <div className="home">
      <section className="homeTop" id="s">
        <Hero />
      </section>
      <section className="stateSummary" id="state-summary">
        <Summary />
      </section>
    </div>
  );
};

export default Home;
