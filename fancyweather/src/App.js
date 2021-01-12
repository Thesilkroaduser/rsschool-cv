/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import WeatherSection from './components/weather';
import LocationSection from './components/location';
import Bg from './components/background';

const App = () => {
  // Background links
  const src = 'https://source.unsplash.com/user/user123321999/likes/1920x1080';
  const src1 = 'https://source.unsplash.com/user/user123321999/likes/1920x1079';
  // Start Geoposition
  const [mapSettings, setMapSettings] = useState({
    latitude: 0,
    longitude: 0,
    width: '21.5vw',
    height: '40vh',
    zoom: 8,
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
    // eslint-disable-next-line no-alert
    alert('Разрешите использование геолокации для получения данных');
  };
  navigator.geolocation.getCurrentPosition(success, error);
  // Search area
  const getLocation = async (e) => {
    const sity = e.target.previousSibling.value;
    const url = `https://api.opencagedata.com/geocode/v1/json?key=e6011b364220458a90b4b4f0a406cac6&q=${sity}&pretty=1&no_annotations=1`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      const coords = (data.results[0].geometry);
      const { lat, lng } = coords;
      setMapSettings((prev) => ({
        ...prev,
        latitude: +lat,
        longitude: +lng,
      }));
    } catch {
      e.target.previousSibling.value = '';
    }
  };

  return (
    <div className="wrapper">
      <Bg className="bg" src={src} />
      <Bg className="bg hidden" src={src1} />
      <WeatherSection />
      <LocationSection mapSettings={mapSettings} handler={getLocation} />
    </div>
  );
};
export default App;
