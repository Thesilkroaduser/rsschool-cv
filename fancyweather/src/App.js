import React, { useEffect, useState } from 'react';
import Bg from './components/backgroundImage/background';
import WeatherSection from './components/weather/weather';
import LocationSection from './components/location/location';
import Header from './components/header/header';
import { getItemFromLocalStorage, getForecast, createWeatherSettings } from './helpers/helpers';
import {
  START_IMAGE_URL, BACKGROUND_URL, LOCATION_URL, GEO_WARNING_MESSAGE_RU, GEO_WARNING_MESSAGE_EN,
} from './constants';

const App = () => {
  // App State
  const [isFahrenheit, setIsFahrenheit] = useState(getItemFromLocalStorage('temperature'));
  const [language, setLanguage] = useState(getItemFromLocalStorage('language'));
  const [mapSettings, setMapSettings] = useState({
    latitude: 53.87,
    longitude: 27.66,
  });
  const [weatherData, setWeatherData] = useState({
    location: '',
    temperature: [0, 0, 0, 0],
    weatherType: '',
    windSpeed: 0,
    humidity: 0,
    timeZone: 'Europe/Minsk',
    icons: ['s01d', 's01d', 's01d', 's01d'],
  });
  const [bgURL, setBgURL] = useState(START_IMAGE_URL);
  const [isBackgroundFaded, setIsBackgroundFaded] = useState(false);

  // Change Background Image
  const changeWallpapers = async () => {
    setIsBackgroundFaded(true);
    setTimeout(() => { setIsBackgroundFaded(false); }, 400);
    const res = await fetch(BACKGROUND_URL);
    const data = await res.json();
    setBgURL(data.urls.regular);
  };

  // Get Sgtart Position
  const getStartPos = () => {
    const success = (pos) => {
      const crd = pos.coords;
      setMapSettings({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
    };
    const error = () => {
      alert(`${language ? GEO_WARNING_MESSAGE_RU : GEO_WARNING_MESSAGE_EN}`);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    getStartPos();
  }, []);

  // Get Forecast by Geolocation
  useEffect(() => {
    getForecast(mapSettings.latitude, mapSettings.longitude, language)
      .then((result) => {
        setWeatherData(createWeatherSettings(result));
      });
  }, [language, mapSettings]);

  // Search area
  const setLocation = async (url) => {
    const res = await fetch(url);
    try {
      const data = await res.json();
      const coords = (data.results[0].geometry);
      const { lat, lng } = coords;
      setMapSettings({
        latitude: +lat,
        longitude: +lng,
      });
    } catch {
      alert(`${language ? 'Некорректный запрос' : 'Incorrect request'}`);
    }
  };
  const getLocation = (e, location) => {
    e.preventDefault();
    const url = `${LOCATION_URL}${location}`;
    setLocation(url);
  };

  const changeLanguage = () => {
    setLanguage(!language);
    if (language) {
      localStorage.setItem('language', JSON.stringify(false));
    } else {
      localStorage.setItem('language', JSON.stringify(true));
    }
  };

  const changeTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
    if (isFahrenheit) {
      localStorage.setItem('temperature', JSON.stringify(false));
    } else {
      localStorage.setItem('temperature', JSON.stringify(true));
    }
  };

  return (
    <div className="wrapper">
      <Bg src={bgURL} isFaded={isBackgroundFaded} />
      <Header
        changeBackground={changeWallpapers}
        changeLanguage={changeLanguage}
        changeTemperature={changeTemperature}
        language={language}
        isFahrenheit={isFahrenheit}
        handler={getLocation}
      />
      <main className="main">
        <WeatherSection isFahrenheit={isFahrenheit} weather={weatherData} language={language} />
        <LocationSection mapSettings={mapSettings} language={language} />
      </main>
    </div>
  );
};
export default App;
