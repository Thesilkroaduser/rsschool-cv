import React, { useState } from 'react';
import * as moment from 'moment';
import SubForecast from './sub-forecast';
import 'moment/locale/ru';

function convertTemperature(temperature) {
  return (temperature * 1.8 + 32).toFixed(2);
}

const Forecast = (props) => {
  const weatherProps = props;
  const { isFarengate, language, weather } = weatherProps.weather;
  moment.locale(`${language ? 'ru' : 'en'}`);
  const {
    humidity, location, temperature, timeZone, weatherType, windSpeed, forecast,
  } = weather;
  if (isFarengate) {
    forecast.map((value) => convertTemperature(value));
  }
  const format = 'ddd D MMMM, kk:mm:ss';
  const [time, setTime] = useState(moment.tz(timeZone).format(format));
  const day = +moment.tz(timeZone).format('d');
  setTimeout(() => {
    const t = moment.tz(timeZone).format(format);
    setTime(t);
  }, 1000);
  return (
    <section className="weather">
      <div className="forecast-wrapper">
        <div>
          <h1 className="main_city">
            {` ${location}`}
          </h1>
          <h2 className="main_date">
            {` ${time}`}
          </h2>
          <p className="main_temp">
            {` ${isFarengate ? convertTemperature(temperature) : temperature}`}
            &deg;
          </p>
        </div>
        <div className="forecast-data">
          <p>
            {`${language ? 'погода:' : 'weather:'}`}
            {` ${weatherType}`}
          </p>
          <p>
            {`${language ? 'ветер:' : 'wind:'}`}
            {` ${windSpeed.toFixed(2)}`}
            m/s
          </p>
          <p>
            {`${language ? 'влажность:' : 'humidity:'}`}
            {` ${humidity}`}
            %
          </p>
        </div>
      </div>
      <div className="sub-forecast-wrapper">
        <SubForecast
          dayNumber={day + 1}
          temperature={isFarengate ? convertTemperature(forecast[0]) : forecast[0]}
        />
        <SubForecast
          dayNumber={day + 2}
          temperature={isFarengate ? convertTemperature(forecast[1]) : forecast[1]}
        />
        <SubForecast
          dayNumber={day + 3}
          temperature={isFarengate ? convertTemperature(forecast[2]) : forecast[2]}
        />
      </div>
    </section>
  );
};

export default Forecast;
