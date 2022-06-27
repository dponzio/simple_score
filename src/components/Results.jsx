import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useLayoutEffect, useState } from "react";
import Nearby from "./Nearby";
import Ratings from "./Ratings";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Pluralize from "pluralize";
import InfoDialogButton from "./InfoDialogButton";

const mapStyles = {
  width: "700px",
  height: "500px",
};

const Results = ({ location }) => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [totalScore, setTotalScore] = useState(null);
  const [scoreColor, setScoreColor] = useState("");
  const [numCafes, setNumCafes] = useState(null);
  const [isNearLibrary, setIsNearLibrary] = useState(false);
  const [nearbySwitch, setNearbySwitch] = useState(0);
  const [done, setDone] = useState(false);

  const nearbyTypes = [
    "cafe",
    "park",
    "restaurant",
    "library",
    "transit_station",
    "train_station",
  ];

  function checkScores() {
    setDone(true);
    console.log("calculation done: " + done);
  }

  function setScore(score) {
    setTotalScore(score);
    if (score >= 7) {
      setScoreColor("green");
    } else if (score > 3 && score < 7) {
      setScoreColor("yellow");
    } else if (score <= 3) {
      setScoreColor("red");
    }
  }

  function getCafes(numCafes) {
    setNumCafes(numCafes);
  }

  function getLibraries(libraryPresent) {
    setIsNearLibrary(libraryPresent);
  }

  useLayoutEffect(() => {
    // console.log(location);
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();
    setLatLng({
      lat: lat,
      lng: lng,
    });
  }, [location]);

  return (
    <>
      <div className="top">
        <div className="address">
          <span>{location.name}</span>
          <li>
            {location.address_components[3].short_name},{" "}
            {location.address_components[5].short_name}{" "}
            {location.address_components[7].short_name}
          </li>
        </div>
        {totalScore !== null && done ? (
          <div className={"overall_rating " + scoreColor}>{totalScore}/8</div>
        ) : (
          <div className="overall_rating"></div>
        )}
      </div>
      <div className="results">
        <div className="left">
          <div className="spacer"> </div>
          <div className="map">
            <GoogleMap zoom={14} mapContainerStyle={mapStyles} center={latLng}>
              <Marker key={location.name} position={latLng} />
            </GoogleMap>
          </div>
        </div>
        <div className="right">
          <Ratings
            location={location}
            setScore={setScore}
            numCafes={numCafes}
            isNearLibrary={isNearLibrary}
            checkScores={checkScores}
          />
        </div>
      </div>
      <div className="desktopMenu">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{ flexWrap: "wrap" }}
        >
          {nearbyTypes.map((type) => {
            return (
              <Button
                onClick={(event) => {
                  setNearbySwitch(nearbyTypes.indexOf(type));
                }}
                key={type}
                variant={
                  nearbySwitch === nearbyTypes.indexOf(type)
                    ? "contained"
                    : "outlined"
                }
              >
                {Pluralize(type).replaceAll("_", " ")}
              </Button>
            );
          })}
          <InfoDialogButton />
        </ButtonGroup>
      </div>
      <div className="mobileMenu">
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          style={{ flexWrap: "wrap" }}
        >
          {nearbyTypes.map((type) => {
            return (
              <Button
                onClick={(event) => {
                  setNearbySwitch(nearbyTypes.indexOf(type));
                }}
                key={type}
                variant={
                  nearbySwitch === nearbyTypes.indexOf(type)
                    ? "primary"
                    : "text"
                }
              >
                {Pluralize(type).replaceAll("_", " ")}
              </Button>
            );
          })}
          <InfoDialogButton />
        </ButtonGroup>
      </div>
      <div className="nearbyresults">
        <Nearby
          isHidden={nearbySwitch === 0 ? false : true}
          location={location}
          type="cafe"
          scoreSetter={getCafes}
        />
        <Nearby
          isHidden={nearbySwitch === 1 ? false : true}
          location={location}
          type="park"
        />
        <Nearby
          isHidden={nearbySwitch === 2 ? false : true}
          location={location}
          type="restaurant"
        />
        <Nearby
          isHidden={nearbySwitch === 3 ? false : true}
          location={location}
          type="library"
          scoreSetter={getLibraries}
        />
        <Nearby
          isHidden={nearbySwitch === 4 ? false : true}
          location={location}
          type="transit_station"
        />
        <Nearby
          isHidden={nearbySwitch === 5 ? false : true}
          location={location}
          type="train_station"
        />
      </div>
    </>
  );
};

export default Results;
