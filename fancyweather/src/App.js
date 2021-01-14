/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
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

  const forecastState = {
    location: '',
    date: '',
    temp: 0,
    weatherType: '',
    windSpeed: 0,
    humidity: 0,
  };
  const [weatherData, setWeatherData] = useState(forecastState);
  const getForecast = async (lat, lng) => {
    const weatherToken = `https://api.weatherbit.io/v2.0/forecast/daily?key=1d89abe5591245d283db44e7d9b3e1d7&lang=en&days=4&lat=${lat}&lon=${lng}`;
    const response = await fetch(weatherToken);
    return response.json();
  };

  const getStartPos = () => {
    const success = (pos) => {
      const crd = pos.coords;
      const newState = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        width: '21.5vw',
        height: '40vh',
        zoom: 8,
      };
      setMapSettings(newState);
    };
    const error = () => {
      // eslint-disable-next-line no-alert
      alert('Разрешите использование геолокации для получения данных');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    if (mapSettings.latitude === 0) {
      getStartPos();
    }
  });

  useEffect(() => {
    getForecast(mapSettings.latitude, mapSettings.longitude)
      .then((result) => {
        setWeatherData((prev) => ({
          ...prev,
          location: result.city_name,
          date: '................',
          temp: result.data[0].temp,
          weatherType: result.data[0].weather.description,
          windSpeed: result.data[0].wind_spd,
          humidity: result.data[0].rh,
        }));
      });
  }, [mapSettings]);
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
  return (
    <div className="wrapper">
      <Bg className="bg" src={bg} />
      <WeatherSection
        handler={getLinkToImage}
        forecast={weatherData}
      />
      <LocationSection mapSettings={mapSettings} handler={getLocation} />
    </div>
  );
};
export default App;
