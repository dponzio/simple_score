import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import {useEffect, useState} from "react";

function App() {
  const [showSearch, setShowSearch] = useState(true)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if(location && location.hasOwnProperty('geometry')) { 
      setShowSearch(false);
    }
  }, [location])

  function handleSelection (place) {
    setLocation(place);
  }

  return (
    <div className="App">
      <Header showTitle={!showSearch}/>
      <div className="main">
        {showSearch && <h1 className="item">🏡 Simple Score</h1>}
        {showSearch? <Search handleSelection={handleSelection}/> : ((location && location.hasOwnProperty('geometry')) && <Results location={location}/>)}
      </div>
    </div>
  );
}

export default App;
