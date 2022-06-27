import React from "react";
import Autocomplete from "react-google-autocomplete";

const searchStyles = {
  width: "300px",
};

const Search = ({ handleSelection }) => {
  //This is where api_key is initially coming from I guess
  // Using different libraries for Autocomplete and for GoogleMap :/
  const api_key = "AIzaSyDqbm6WKETGpphXwlvMGgKShoMX9K2bN3w";
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["address"],
  };

  const handleSubmit = (e) => {
    console.log("submit clicked");
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
              style={searchStyles}
            />
          </div>
        </label>
        {/* <input
          type="button"
          value="Submit"
          id="submit"
          onClick={(e) => handleSubmit(e)}
        /> */}
      </form>
    </div>
  );
};

export default Search;
