import { Search } from "../search/Search";
import "./hero.css";
export const Hero = ({ recentSearches, setRecentSearches }) => {
  return (
    <div className="hero">
      <div className="heroWrapper">
        <p className="searchHeading">Search Weather</p>
        <Search
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
        />
      </div>
    </div>
  );
};
