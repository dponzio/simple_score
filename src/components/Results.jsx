import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";
import Nearby from "./Nearby";
import Ratings from "./Ratings";

const mapStyles = {
  width: "50%",
  height: "50%",
};

const Results = ({ location }) => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [numCafes, setNumCafes] = useState(null);
  const [isNearLibrary, setIsNearLibrary] = useState(false);

  function setScore(score) {
    setTotalScore(score);
  }

  function getCafes(numCafes) {
    setNumCafes(numCafes);
  }

  function getLibraries(libraryPresent) {
    setIsNearLibrary(libraryPresent);
    console.log("Library nearby? " + libraryPresent);
  }

  useEffect(() => {
    console.log(location);
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
        <div className="overall_rating">{totalScore}/8</div>
      </div>
      <div className="results">
        <div className="left">
          <GoogleMap zoom={14} mapContainerStyle={mapStyles} center={latLng}>
            <Marker key={location.name} position={latLng} />
          </GoogleMap>
          <div className="nearbyresults">
            <Nearby location={location} type="cafe" scoreSetter={getCafes} />
            <Nearby location={location} type="park" />
            <Nearby location={location} type="restaurant" />
            <Nearby
              location={location}
              type="library"
              scoreSetter={getLibraries}
            />
            <Nearby location={location} type="transit_station" />
            <Nearby location={location} type="light_rail_station" />
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
    </>
  );
};

export default Results;
