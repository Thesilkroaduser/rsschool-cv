import React from 'react';
import PropTypes from 'prop-types';
import './forecast.scss';
import * as moment from 'moment';
import SubForecast from './sub-forecast';
import Time from './time';
import 'moment/locale/ru';
import { convertTemperature } from '../../helpers/helpers';

const Forecast = (props) => {
  const iconLink = 'https://www.weatherbit.io/static/img/icons/';
  const { isFahrenheit, weather, isRussian } = props;
  moment.locale(`${isRussian ? 'ru' : 'en'}`);
  const {
    humidity, location, temperature, timeZone, weatherType, windSpeed, icons,
  } = weather;
  if (isFahrenheit) {
    temperature.map((value) => convertTemperature(value));
  }
  const day = +moment.tz(timeZone).format('d');
  return (
    <div className="weather">
      <div className="forecast-wrapper">
        <div className="main-weather">
          <h1 className="main_city">
            {` ${location}`}
          </h1>
          <Time timeZone={timeZone} isRussian={isRussian} />
          <p className="main_temp">
            {` ${isFahrenheit ? convertTemperature(temperature[0]) : temperature[0]}`}
            &deg;
          </p>
        </div>
        <div style={{ backgroundImage: `url('${iconLink}${icons[0]}.png')` }} className="forecast-data">
          <p className="forecast-data__item">
            {`${isRussian ? 'погода:' : 'DESC:'}`}
            {` ${weatherType}`}
          </p>
          <p className="forecast-data__item">
            {`${isRussian ? 'ветер:' : 'wind:'}`}
            {` ${windSpeed.toFixed(2)}`}
            m/s
          </p>
          <p className="forecast-data__item">
            {`${isRussian ? 'влажность:' : 'humidity:'}`}
            {` ${humidity}`}
            %
          </p>
        </div>
      </div>
      <div className="sub-forecast-wrapper">
        <SubForecast
          dayNumber={isRussian ? day : day + 1}
          temperature={isFahrenheit ? `${convertTemperature(temperature[1])}` : `${temperature[1]}`}
          icon={icons[1]}
        />
        <SubForecast
          dayNumber={isRussian ? day + 1 : day + 2}
          temperature={isFahrenheit ? `${convertTemperature(temperature[2])}` : `${temperature[2]}`}
          icon={icons[2]}
        />
        <SubForecast
          dayNumber={isRussian ? day + 2 : day + 3}
          temperature={isFahrenheit ? `${convertTemperature(temperature[3])}` : `${temperature[3]}`}
          icon={icons[3]}
        />
      </div>
    </div>
  );
};

Forecast.propTypes = {
  isFahrenheit: PropTypes.bool.isRequired,
  isRussian: PropTypes.bool.isRequired,
  weather: PropTypes.shape({
    humidity: PropTypes.number,
    icons: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string.isRequired,
    temperature: PropTypes.arrayOf(PropTypes.number),
    timeZone: PropTypes.string,
    weatherType: PropTypes.string,
    windSpeed: PropTypes.number,
  }).isRequired,
};

export default Forecast;
