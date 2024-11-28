import React from "react";
import "./IntensitySlider.css";

const IntensitySlider = ({ isVisible, intensity, setIntensity }) => {
  const intensityLevels = [
    { label: "Normal", emoji: "😊" },
    { label: "Mild", emoji: "😅" },
    { label: "Extreme", emoji: "😡" },
    { label: "Deadly", emoji: "🤯" },
  ];

  const handleIntensityChange = (e) => {
    const val = Number(e.target.value);
    const arr = [3, 34, 64, 96];
    const newValue = arr.reduce((prev, curr) =>
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
    setIntensity(newValue);
  };

  const getActiveIndex = () => {
    return Math.min(
      Math.floor(intensity / (100 / intensityLevels.length)),
      intensityLevels.length - 1
    );
  };
  if (isVisible) {
    return (
      <div className="intensity-slider">
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={handleIntensityChange}
          className="slider_intensity"
        />
        <div className="intensity-labels">
          {intensityLevels.map((level, index) => (
            <span
              key={index}
              className={`intensity-label ${
                getActiveIndex() === index ? "active" : ""
              }`}
            >
              <span className="emoji">{level.emoji}</span>
              <span className="label-text">{level.label}</span>
            </span>
          ))}
        </div>
      </div>
    );
  } else {
    return;
  }
};

export default IntensitySlider;
