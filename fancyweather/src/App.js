/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import WeatherSection from './components/weather';
import LocationSection from './components/location';
import Bg from './components/background';

const App = () => {
  const src = 'https://source.unsplash.com/user/user123321999/likes/1920x1080';
  const src1 = 'https://source.unsplash.com/user/user123321999/likes/1920x1079';

  const [mapSettings, setMapSettings] = useState({
    latitude: 0,
    longitude: 0,
    width: '22vw',
    height: '40vh',
    zoom: 9,
  });
  const success = (pos) => {
    const crd = pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;
    setMapSettings((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };
  const error = () => {
    alert('Разрешите использование геолокации для получения данных');
  };
  navigator.geolocation.getCurrentPosition(success, error);

  return (
    <div className="wrapper">
      <Bg className="bg" src={src} />
      <Bg className="bg hidden" src={src1} />
      <WeatherSection />
      <LocationSection mapSettings={mapSettings} />
    </div>
  );
};
export default App;
