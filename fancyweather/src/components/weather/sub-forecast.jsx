import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

const SubForecast = (props) => {
  const { dayNumber, temperature } = props;
  const day = moment().weekday(dayNumber).format('dddd');
  return (
    <div className="sub-forecast">
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
  temperature: PropTypes.number.isRequired,
};

export default SubForecast;
