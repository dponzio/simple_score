import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pluralize from "pluralize";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Placeholder from "../assets/placeholder.png";

const Nearby = ({ location, type, scoreSetter, isHidden }) => {
  const proxy = "https://arcane-gorge-12114.herokuapp.com/";
  const api_key = "AIzaSyDqbm6WKETGpphXwlvMGgKShoMX9K2bN3w";
  const [nearbyLocales, setNearbyLocales] = useState([]);
  const [listCount, setListCount] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);

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

  function expandList(event) {
    event.preventDefault();
    if (!isExpanded) {
      setListCount(nearbyLocales.length);
      setIsExpanded(true);
    } else if (isExpanded) {
      setListCount(8);
      setIsExpanded(false);
    }
  }

  return (
    <div className={isHidden ? "item hidden" : "item"}>
      {nearbyLocales && (
        <div className="nearby">
          <div className="nearbyArea">
            {nearbyLocales.length === 0 && (
              <div>
                <p> No {Pluralize(type).replaceAll("_", " ")} nearby... </p>
              </div>
            )}
            {nearbyLocales.length > 0 &&
              nearbyLocales
                .sort((a, b) => (a.rating > b.rating ? -1 : 1))
                .slice(0, listCount)
                .map((cafe) => {
                  return (
                    <div key={cafe.place_id} className="nearbyCard">
                      <Card sx={{ width: 300, maxHeight: 275 }}>
                        <CardActionArea
                          href={
                            "https://www.google.com/maps/place/?q=place_id:" +
                            cafe.place_id
                          }
                          target="_blank"
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {cafe.name}{" "}
                              <span style={{ fontSize: "15px" }}>
                                ({cafe.rating} ⭐️)
                              </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {cafe.vicinity}
                            </Typography>
                          </CardContent>
                          <CardMedia
                            component="img"
                            height="200"
                            image={
                              cafe.hasOwnProperty("photos")
                                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${cafe.photos[0].photo_reference}&key=${api_key}`
                                : Placeholder
                            }
                            alt={cafe.name}
                          />
                        </CardActionArea>
                      </Card>
                    </div>
                  );
                })}
          </div>
          {listCount <= 8 && nearbyLocales.length > 8 && !isExpanded ? (
            <Button variant="outlined" onClick={(event) => expandList(event)}>
              Show more
            </Button>
          ) : nearbyLocales.length > 8 && isExpanded ? (
            <Button variant="outlined" onClick={(event) => expandList(event)}>
              Show less
            </Button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Nearby;
