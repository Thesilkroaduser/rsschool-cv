/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Bg from './components/backgroundImage/background';
import Main from './components/main/main';
import Header from './components/header/header';

const App = () => {
  // Language
  const [language, setLanguage] = useState(false);
  // Temperature
  const [isFarengate, setIsFarengate] = useState(false);
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
    latitude: 53.87,
    longitude: 27.66,
    width: '21.5vw',
    height: '40vh',
    zoom: 8,
  });

  const forecastState = {
    location: '',
    temperature: 0,
    weatherType: '',
    windSpeed: 0,
    humidity: 0,
    timeZone: 'Europe/Minsk',
    forecast: [0, 0, 0],
  };
  const [weatherData, setWeatherData] = useState(forecastState);
  const getForecast = async (lat, lng, lang) => {
    const weatherToken = `https://api.weatherbit.io/v2.0/forecast/daily?key=1d89abe5591245d283db44e7d9b3e1d7&lang=${lang ? 'ru' : 'en'}&days=4&lat=${lat}&lon=${lng}`;
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
    getStartPos();
  }, []);

  useEffect(() => {
    getForecast(mapSettings.latitude, mapSettings.longitude, language)
      .then((result) => {
        setWeatherData((prev) => ({
          ...prev,
          location: result.city_name,
          temperature: result.data[0].temp,
          weatherType: result.data[0].weather.description,
          windSpeed: result.data[0].wind_spd,
          humidity: result.data[0].rh,
          timeZone: result.timezone,
          forecast: [result.data[1].temp, result.data[2].temp, result.data[3].temp],
        }));
      });
  }, [language, mapSettings]);
  // Search area
  const setLocation = async (e, url) => {
    const res = await fetch(url);
    try {
      if (e.target.type === 'button') {
        e.target.previousSibling.value = '';
      } else if (e.target.type === 'text') {
        e.target.value = '';
      }
      const data = await res.json();
      const coords = (data.results[0].geometry);
      const { lat, lng } = coords;
      setMapSettings((prev) => ({
        ...prev,
        latitude: +lat,
        longitude: +lng,
      }));
    } catch {
      if (e.target.type === 'button') {
        e.target.previousSibling.value = '';
      } else if (e.target.type === 'text') {
        e.target.value = '';
      }
    }
  };
  const getLocation = async (e) => {
    let city;
    const firstURLPart = 'https://api.opencagedata.com/geocode/v1/json?key=f875bda9dc784b428177e7d5aa55c262&q=';
    const secondURLPart = '&pretty=1&no_annotations=1';
    if (e.type === 'click') {
      city = e.target.previousSibling.value;
      const url = `${firstURLPart}${city}${secondURLPart}`;
      setLocation(e, url);
    } else if (e.type === 'keydown' && e.key === 'Enter') {
      city = e.target.value;
      const url = `${firstURLPart}${city}${secondURLPart}`;
      setLocation(e, url);
    }
  };

  const changeLanguage = () => {
    setLanguage(!language);
  };

  const changeTemperature = (e) => {
    const buttons = document.querySelectorAll('.temperature');
    if (e.target.className.includes('inactive')) {
      buttons.forEach((button) => button.classList.toggle('inactive'));
      setIsFarengate(!isFarengate);
    }
  };

  return (
    <div className="wrapper">
      <Bg className="bg" src={bg} />
      <Header
        changeBackground={getLinkToImage}
        changeLanguage={changeLanguage}
        changeTemperature={changeTemperature}
        language={language}
        handler={getLocation}
      />
      <Main
        isFarengate={isFarengate}
        language={language}
        forecast={weatherData}
        mapSettings={mapSettings}
      />
    </div>
  );
};
export default App;
