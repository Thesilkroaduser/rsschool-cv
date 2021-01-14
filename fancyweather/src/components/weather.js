import React from 'react';
import Controls from './controls';
import Forecast from './forecast';

const WeatherSection = (data) => {
  const { handler, forecast } = data;
  return (
    <section className="section">
      <Controls handler={handler} />
      <Forecast weather={forecast} />
    </section>
  );
};

export default WeatherSection;
