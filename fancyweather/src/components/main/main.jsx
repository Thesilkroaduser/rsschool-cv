import React from 'react';
import WeatherSection from '../weather/weather';
import LocationSection from '../location/location';

const Main = (data) => {
  const {
    isFarengate, language, forecast, mapSettings,
  } = data;
  return (
    <main className="main">
      <WeatherSection isFarengate={isFarengate} weather={forecast} language={language} />
      <LocationSection mapSettings={mapSettings} language={language} />
    </main>
  );
};

export default Main;
