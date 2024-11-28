import React from "react";
import "./NewsComparison.css";

const NewsComparison = ({ isVisible, setIsVisible, news }) => {
  if (isVisible && news) {
    return (
      <div className="news-comparison">
        <div className="article-container">
          <article className="base-article">
            <h3>{news.title}</h3>
            <img
              src={news.image}
              alt=""
              height={"200px"}
              className="float-image"
            />
            <p className="sigma-p" dangerouslySetInnerHTML={{ __html: news.content }}></p>
          </article>
        </div>
        <a
          onClick={() => setIsVisible((prev) => !prev)}
          className="close-button"
        >
          ✖
        </a>
      </div>
    );
  } else {
    return;
  }
};

export default NewsComparison;
