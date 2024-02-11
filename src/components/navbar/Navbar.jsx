import { Link } from "react-scroll";
import "./navbar.css";
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="s" smooth={true} duration={500}>
          GoWeather
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="s" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="state-summary"
                smooth={true}
                duration={500}
              >
                State Summary
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
