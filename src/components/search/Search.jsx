import { useRef, useEffect, useState } from "react";
import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const ref1 = useRef();
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [unit, setUnit] = useState("metric");
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  const handleSubmit = () => {
    const city = ref.current.value;
    navigate(`/weather/${city}/${unit}`);

    updateRecentSearches(city);
  };

  const updateRecentSearches = (city) => {
    const updatedSearches = [
      city,
      ...recentSearches.filter((item) => item !== city),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  return (
    <>
      <div className={`searchParent ${isSearchVisible && "parentActive"}`}>
        <div className="search">
          <input
            type="text"
            ref={ref}
            className="searchInput"
            placeholder="Enter City Name to search"
            onClick={() => setIsSearchVisible(true)}
          />
          <button className="searchIcon" onClick={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
        {isSearchVisible && (
          <div className="recentSearches">
            <ul>
              {recentSearches.map((search, index) => (
                <li
                  className="searched"
                  key={index}
                  onClick={() => navigate(`/weather/${search}/${unit}`)}
                >
                  {search}
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <select className="select" ref={ref1} onChange={handleUnitChange}>
        <option value="metric" className="selectOption">
          &deg;C
        </option>
        <option value="imperial" className="selectOption">
          F
        </option>
      </select>
    </>
  );
};
