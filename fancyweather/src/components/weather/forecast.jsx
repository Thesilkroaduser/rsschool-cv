import React, { useState } from 'react';
import * as moment from 'moment';
import SubForecast from './sub-forecast';
import 'moment/locale/ru';
import convertTemperature from '../../helpers/helpers';

const Forecast = (props) => {
  const iconLink = 'https://www.weatherbit.io/static/img/icons/';
  const weatherProps = props;
  const { isFarengate, language, weather } = weatherProps.weather;
  moment.locale(`${language ? 'ru' : 'en'}`);
  const {
    humidity, location, temperature, timeZone, weatherType, windSpeed, forecast, mainIcon, subIcons,
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
    <div className="weather">
      <div className="forecast-wrapper">
        <div className="main-weather">
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
        <div style={{ backgroundImage: `url('${iconLink}${mainIcon}.png')` }} className="forecast-data">
          <p className="forecast-data__item">
            {`${language ? 'погода:' : 'DESC:'}`}
            {` ${weatherType}`}
          </p>
          <p className="forecast-data__item">
            {`${language ? 'ветер:' : 'wind:'}`}
            {` ${windSpeed.toFixed(2)}`}
            m/s
          </p>
          <p className="forecast-data__item">
            {`${language ? 'влажность:' : 'humidity:'}`}
            {` ${humidity}`}
            %
          </p>
        </div>
      </div>
      <div className="sub-forecast-wrapper">
        <SubForecast
          dayNumber={language ? day : day + 1}
          temperature={isFarengate ? `${convertTemperature(forecast[0])}` : `${forecast[0]}`}
          icon={subIcons[0]}
        />
        <SubForecast
          dayNumber={language ? day + 1 : day + 2}
          temperature={isFarengate ? `${convertTemperature(forecast[1])}` : `${forecast[1]}`}
          icon={subIcons[1]}
        />
        <SubForecast
          dayNumber={language ? day + 2 : day + 3}
          temperature={isFarengate ? `${convertTemperature(forecast[2])}` : `${forecast[2]}`}
          icon={subIcons[2]}
        />
      </div>
    </div>
  );
};

export default Forecast;
