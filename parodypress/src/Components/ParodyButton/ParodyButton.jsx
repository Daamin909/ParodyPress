import React from "react";
import "./ParodyButton.css";

const ParodyButton = ({
  isLoading,
  handleClick,
  inputValue,
  setInputValue,
}) => {
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for some news..."
          className="parody-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="button-container">
          <button
            className="parodify-button"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Parodifiying...." : "Parodify News 📰"}
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="loading-animation">
          <div className="newspaper">
            <div className="newspaper-content">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div className="pen"></div>
        </div>
      )}
    </>
  );
};

export default ParodyButton;
