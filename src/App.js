import React from 'react';
import WeatherSection from './components/weather';
import LocationSection from './components/location'

const App = () => {
  return (
    <div className="wrapper">
      <WeatherSection />
      <LocationSection />
    </div>
  );
}

export default App;
