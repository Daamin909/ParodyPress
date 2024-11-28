import React, { useState } from "react";
import ParodyButton from "./components/ParodyButton/ParodyButton.jsx";
import NewsComparison from "./Components/NewsComparison/NewsComparison.jsx";

import "./App.css";
import IntensitySlider from "./Components/IntensitySlider/IntensitySlider.jsx";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage.jsx";
import { getNews } from "./scripts/index";

function App() {
  const [showNews, setShowNews] = useState(false);
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intensity, setIntensity] = useState(3);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = async () => {
    setShowNews(false)
    if (inputValue.length > 25) {
      displayError("The query should be 25 characters or less.");
      setInputValue("");
      return;
    } else if (inputValue.length == 0) {
      displayError("Enter a search query.");
      setInputValue("");
      return;
    }
    setIsLoading(true);
    const news_resp = await getNews(inputValue, intensity);
    if (news_resp=="0"){
      setIsLoading(false)
      displayError("No news found.")
      setInputValue("")
      return;
    }
    setNews(news_resp)
    setIsLoading(false);
    setShowNews(true);
  };
  const displayError = (text) => {
    setErrorMessage(text);
  };
  return (
    <div className="app">
      <main>
        <ParodyButton
          isLoading={isLoading}
          handleClick={handleClick}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <IntensitySlider
          isVisible={!showNews && !isLoading}
          intensity={intensity}
          setIntensity={setIntensity}
        />
        <NewsComparison isVisible={showNews} setIsVisible={setShowNews} news={news} />
      </main>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          duration={2000}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}

export default App;