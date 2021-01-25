import React, { useState } from 'react';
import 'moment/locale/ru';
import * as moment from 'moment';
import PropTypes from 'prop-types';

const Time = (props) => {
  const { timeZone, isRussian } = props;
  moment.locale(`${isRussian ? 'ru' : 'en'}`);
  const format = 'ddd D MMMM, kk:mm:ss';
  const [time, setTime] = useState(moment.tz(timeZone).format(format));
  setTimeout(() => {
    const t = moment.tz(timeZone).format(format);
    setTime(t);
  }, 1000);
  return (
    <h2 className="main_date">
      {` ${time}`}
    </h2>
  );
};

Time.propTypes = {
  timeZone: PropTypes.string.isRequired,
  isRussian: PropTypes.bool.isRequired,
};

export default Time;
