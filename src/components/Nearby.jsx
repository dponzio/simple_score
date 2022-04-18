import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Nearby = ({ location, type, scoreSetter }) => {
  const proxy = "http://localhost:4000/";
  const api_key = "redacted";
  const [nearbyLocales, setNearbyLocales] = useState([]);

  useEffect(() => {
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();

    // Google API takes radius in meters. 1.6km = 1 mi
    var rad = 1600;
    var config = {
      method: "get",
      url: `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${rad}&type=${type}&key=${api_key}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        var locales = response.data.results.filter((l) => {
          return l.business_status === "OPERATIONAL" && l.rating > 3;
        });
        setNearbyLocales(locales);
        if (type === "cafe") {
          scoreSetter(locales.length);
        }
        if (type === "library") {
          var realLibraries = locales.filter((lib) => {
            var name = lib.name.toLowerCase();
            return !name.includes("free");
          });

          setNearbyLocales(realLibraries);
          realLibraries.length > 0 ? scoreSetter(true) : scoreSetter(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="item">
      {nearbyLocales && (
        <ul className="nearby">
          <p>
            <b>
              Nearby {type}s (
              {nearbyLocales.length > 10 ? "10+" : nearbyLocales.length})
            </b>
          </p>
          {nearbyLocales.slice(0, 10).map((cafe) => {
            return (
              <li key={cafe.place_id}>
                <a
                  href={
                    "https://www.google.com/maps/place/?q=place_id:" +
                    cafe.place_id
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {cafe.name}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Nearby;
