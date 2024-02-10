import { useRef } from "react";
import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
export const Search = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const handleSubmit = () => {
    const city = ref.current.value;
    navigate(`/weather/${city}`);
  };
  return (
    <div className="search">
      <input
        type="text"
        ref={ref}
        className="searchInput"
        placeholder="Enter City Name to search"
      />
      <button className="searchIcon" onClick={handleSubmit}>
        <SearchIcon />
      </button>
    </div>
  );
};
