import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

const SubForecast = (props) => {
  const iconLink = 'https://www.weatherbit.io/static/img/icons/';
  const { dayNumber, temperature, icon } = props;
  const day = moment().weekday(dayNumber).format('dddd');
  return (
    <div style={{ backgroundImage: `url('${iconLink}${icon}.png')` }} className="sub-forecast">
      <p className="day-of-week">{day}</p>
      <p className="sub-temperature">
        {temperature}
        &deg;
      </p>
    </div>
  );
};

SubForecast.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  temperature: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default SubForecast;
