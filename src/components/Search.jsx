import React from "react";
import Autocomplete from "react-google-autocomplete";

const Search = ({ handleSelection }) => {
  //This is where api_key is initially coming from I guess
  // Using different libraries for Autocomplete and for GoogleMap :/
  const api_key = "redacted";
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["address"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="item">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label>
          <div className="autocomplete">
            <Autocomplete
              apiKey={api_key}
              options={options}
              className="search"
              onPlaceSelected={(place) => {
                handleSelection(place);
              }}
            />
          </div>
        </label>
        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  );
};

export default Search;
