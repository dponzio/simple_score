import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useLayoutEffect, useState } from "react";
import Nearby from "./Nearby";
import Ratings from "./Ratings";

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
        {totalScore !== null && (
          <div className={"overall_rating " + scoreColor}>{totalScore}/8</div>
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
          />
        </div>
      </div>
      <div className="nearbyresults">
        <Nearby location={location} type="cafe" scoreSetter={getCafes} />
        <Nearby location={location} type="park" />
        <Nearby location={location} type="restaurant" />
        <Nearby location={location} type="library" scoreSetter={getLibraries} />
        <Nearby location={location} type="transit_station" />
        <Nearby location={location} type="light_rail_station" />
      </div>
    </>
  );
};

export default Results;
