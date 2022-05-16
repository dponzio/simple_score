import React from "react";

const Header = ({ showTitle }) => {
  return (
    <header className="app-header">
      <div className="title">
        {showTitle ? (
          <a href="http://localhost:3000">
            <h1 className="item">🏡 Simple Score</h1>
          </a>
        ) : (
          <div></div>
        )}
      </div>
      <div className="links">
        <div className="link">
          <a
            href="https://github.com/dponzio/simple_score/blob/main/README.md"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>
        <div className="link">
          <a
            href="https://github.com/dponzio/simple_score"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
