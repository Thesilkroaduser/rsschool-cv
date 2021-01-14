import React from 'react';

const Forecast = (data) => {
  const forecastState = data.weather;
  return (
    <section className="forecast-wrapper">
      <div>
        <h1 className="main_sity">
          Location:
          {` ${forecastState.location}`}
        </h1>
        <h2 className="main_date">
          Date:
          {` ${forecastState.date}`}
        </h2>
        <p className="main_temp">
          {` ${forecastState.temp}`}
          &deg;
        </p>
      </div>
      <div className="sub-forecast">
        <p>
          Weather Type:
          {` ${forecastState.weatherType}`}
        </p>
        <p>
          Wind:
          {` ${forecastState.windSpeed}`}
          m/s
        </p>
        <p>
          Humidity
          {` ${forecastState.humidity}`}
          %
        </p>
      </div>
    </section>
  );
};

export default Forecast;
