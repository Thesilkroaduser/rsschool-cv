/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import WeatherSection from './components/weather';
import LocationSection from './components/location';
import Bg from './components/background';

const App = () => {
  // Background
  let bgLink = 'https://source.unsplash.com/user/user123321999/likes/1920x1080';
  const [bg, setBg] = useState(bgLink);
  const getLinkToImage = async () => {
    const url = 'https://api.unsplash.com/photos/random?collections=57475813&client_id=4IltOePWMoqy_YsKGjntshdtDHBPpYjI55gqWkLi3E0';
    const res = await fetch(url);
    const data = await res.json();
    const src = data.urls.regular;
    bgLink = src;
    setBg(bgLink);
  };
  // Start Geoposition
  const [mapSettings, setMapSettings] = useState({
    latitude: 0,
    longitude: 0,
    width: '21.5vw',
    height: '40vh',
    zoom: 8,
  });
  const getStartPos = () => {
    const success = (pos) => {
      const crd = pos.coords;
      const lat = crd.latitude;
      const lng = crd.longitude;
      console.log(lat, lng);
      // setMapSettings((prev) => ({
      //   ...prev,
      //   latitude: lat,
      //   longitude: lng,
      // }));
    };
    const error = () => {
      // eslint-disable-next-line no-alert
      alert('Разрешите использование геолокации для получения данных');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  getStartPos();
  // Search area
  const getLocation = async (e) => {
    const sity = e.target.previousSibling.value;
    const url = `https://api.opencagedata.com/geocode/v1/json?key=f875bda9dc784b428177e7d5aa55c262&q=${sity}&pretty=1&no_annotations=1`;
    const res = await fetch(url);
    try {
      e.target.previousSibling.value = '';
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
  // Forecast
  const coords = {
    lat: mapSettings.latitude,
    lng: mapSettings.longitude,
  };
  console.log('Render!');
  return (
    <div className="wrapper">
      <Bg className="bg" src={bg} />
      <WeatherSection handler={getLinkToImage} coords={coords} />
      <LocationSection mapSettings={mapSettings} handler={getLocation} />
    </div>
  );
};
export default App;
