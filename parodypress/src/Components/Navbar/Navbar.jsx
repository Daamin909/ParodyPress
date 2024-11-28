import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <svg
            className="logo"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5V19H5V5H19ZM21 3H3V21H21V3ZM17 11H7V13H17V11ZM17 7H7V9H17V7ZM17 15H7V17H17V15Z"
              fill="currentColor"
            />
          </svg>
          <h1 className="app-name">ParodyPress</h1>
        </div>
        <div className="tagline-wrapper">
          <p className="tagline animated">Actual News? Nah.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
