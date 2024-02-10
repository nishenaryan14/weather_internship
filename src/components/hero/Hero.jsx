import { Search } from "../search/Search";
import "./hero.css";
export const Hero = () => {
  return (
    <div className="hero">
      <div className="heroWrapper">
        <p className="searchHeading">Search Weather</p>
        <Search />
      </div>
    </div>
  );
};
