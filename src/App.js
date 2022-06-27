import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  const [showSearch, setShowSearch] = useState(true)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if(location && location.hasOwnProperty('geometry')) { 
      setShowSearch(false);
    }
  }, [location])

  function handleSelection (place) {
    //let urlName = place.name.replace(/ /g,"-") + "-" + place.address_components[7].short_name;
    setLocation(place);
    //window.location.href="/" + urlName 
  }

  return (
    <Router>
      <div className="App">
        <Header showTitle={!showSearch} handleSelection={handleSelection}/>
        <div className="main">
          {showSearch && <a href="http://simplescore.info"><h1 className="item">🏡 Simple Score</h1></a>}
          {/* {showSearch? <Search handleSelection={handleSelection}/> : ((location && location.hasOwnProperty('geometry')) && <Results location={location}/>)} */}
          <Switch>
            <Route exact path="/">
              {showSearch && <Search handleSelection={handleSelection}/>} 
              {(location && location.hasOwnProperty('geometry'))? <Results location={location}/> : ""}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
