import React from 'react';
import './forecast.scss';
import Forecast from './forecast';

const WeatherSection = (props) => {
  const forecast = props;
  return (
    <section className="section">
      <Forecast weather={forecast} />
    </section>
  );
};

export default WeatherSection;
