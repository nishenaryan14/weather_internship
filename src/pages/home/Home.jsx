import { useEffect, useState } from "react";
import { Hero } from "../../components/hero/Hero";
import "./home.css";
import Summary from "../../components/summary/Summary";
const Home = () => {
  return (
    <div className="home">
      <section className="homeTop">
        <Hero />
      </section>
      <section className="stateSummary">
        <Summary />
      </section>
    </div>
  );
};
export default Home;
