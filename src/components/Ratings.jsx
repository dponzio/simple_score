import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import logo from "../assets/loadinghouse.gif";

const Ratings = ({ location, setScore, numCafes, isNearLibrary }) => {
  const [walkScore, setWalkScore] = useState(null);
  const [bikeScore, setBikeScore] = useState(null);
  // Transit score not working with walkscore API at the moment
  //const [transitScore, setTransitScore] = useState(null);
  const [cafeScore, setCafeScore] = useState(0);
  //5,000 daily limit to the Walk Score API: redacted
  const proxy = "http://localhost:4000/";
  const api_key = "b92c50552b95766632e07dc09cca20a1";

  function updateScores() {
    var score = 0;
    if (walkScore >= 75) score = score + 2;
    if (walkScore >= 50 && walkScore < 75) score = score + 1;
    if (bikeScore >= 75) score = score + 2;
    if (bikeScore >= 50 && bikeScore < 75) score = score + 1;
    if (numCafes >= 5) {
      score = score + 2;
      setCafeScore(2);
    }
    if (numCafes >= 3 && numCafes < 5) {
      score = score + 1;
      setCafeScore(1);
    }
    if (isNearLibrary) score = score + 2;
    setScore(score);
  }

  useEffect(() => {
    const address = encodeURIComponent(location.name);
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();
    //setCafeCount(numCafes);

    const url = `https://api.walkscore.com/score?format=json&address=${address}&lat=${lat}&lon=${lng}&transit=1&bike=1&wsapikey=${api_key}`;
    var config = {
      method: "get",
      url: `${proxy}${url}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setWalkScore(response.data.walkscore);
        setBikeScore(response.data.bike.score);
      })
      .catch(function (error) {
        console.log(error);
      });

    updateScores();
  }, [location, walkScore, bikeScore, numCafes]);

  //if (!walkScore || !bikeScore || !cafeScore) return <p>Loading...</p>;

  return (
    <div className="ratings">
      <div className="rating">👟 Walk Score: {walkScore}/100</div>
      <div className="rating">🚲 Bike Score: {bikeScore}/100</div>
      {/* <div className="rating">🚌 Transit Score: {transitScore}</div> */}
      <div className="rating">☕️ Café Score: {cafeScore} / 2</div>
      <div className="rating">
        📚 Library nearby? {isNearLibrary ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default Ratings;
