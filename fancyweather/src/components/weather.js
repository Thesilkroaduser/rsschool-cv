import React, { useState } from 'react';
import Controls from './controls';
import Forecast from './forecast';

const WeatherSection = (data) => {
  const { handler, coords } = data;
  const forecastState = {
    location: '',
    date: '',
    temp: 0,
    weatherType: '',
    windSpeed: 0,
    humidity: 0,
  };
  const { lat, lng } = coords;
  console.log(lat, lng);
  const [weatherData] = useState(forecastState);
  // const weatherToken = `https://api.weatherbit.io/v2.0/forecast/daily?key=1d89abe5591245d283db44e7d9b3e1d7&lang=en&days=4&lat=${lat}&lon=${lng}`;
  // const getForecast = async (url) => {
  //   const response = await fetch(url);
  //   return response.json();
  // };
  // getForecast(weatherToken)
  //   .then((result) => {
  //     // console.log(result);
  //     setWeatherData((prev) => ({
  //       ...prev,
  //       location: result.city_name,
  //       date: 123,
  //       temp: result.data[0].temp,
  //       weatherType: result.data[0].weather.description,
  //       windSpeed: result.data[0].wind_spd,
  //       humidity: result.data[0].rh,
  //     }));
  //   });
  return (
    <section className="section">
      <Controls handler={handler} />
      <Forecast weather={weatherData} />
    </section>
  );
};

export default WeatherSection;
