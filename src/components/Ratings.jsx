import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Ratings = ({
  location,
  setScore,
  numCafes,
  isNearLibrary,
  checkScores,
}) => {
  const [walkScore, setWalkScore] = useState(null);
  const [bikeScore, setBikeScore] = useState(null);
  // Transit score not working with walkscore API at the moment
  //const [transitScore, setTransitScore] = useState(null);
  const [cafeScore, setCafeScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const proxy = "https://arcane-gorge-12114.herokuapp.com/";
  const api_key = "redacted";

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
        setWalkScore(response.data.walkscore);
        setBikeScore(response.data.bike.score);
        setIsReady(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    updateScores();

    if (isReady) checkScores();
  }, [location, walkScore, bikeScore, numCafes, isReady]);

  return (
    <div className="ratings">
      <Card className="rating">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            👟 Walk Score: {walkScore ? walkScore + "/100" : ""}
          </Typography>
        </CardContent>
      </Card>
      <Card className="rating">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            🚲 Bike Score: {bikeScore ? bikeScore + "/100" : ""}
          </Typography>
        </CardContent>
      </Card>
      <Card className="rating">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ☕️ Café Score: {cafeScore}/2
          </Typography>
        </CardContent>
      </Card>
      <Card className="rating">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            📚 Library nearby? {isNearLibrary ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ratings;
