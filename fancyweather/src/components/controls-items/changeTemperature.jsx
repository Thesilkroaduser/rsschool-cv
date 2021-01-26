import React from 'react';
import PropTypes from 'prop-types';

const ChangeTemperature = (props) => {
  const { changeTemperature, isFahrenheit } = props;
  return (
    <div className="sub-controls">
      <button onClick={changeTemperature} type="button" className={`farengate ${isFahrenheit ? '' : 'inactive'}`}>
        &deg;F
      </button>
      <button onClick={changeTemperature} type="button" className={`celsius ${isFahrenheit ? 'inactive' : ''}`}>
        &deg;C
      </button>
    </div>
  );
};

ChangeTemperature.propTypes = {
  changeTemperature: PropTypes.func.isRequired,
  isFahrenheit: PropTypes.bool.isRequired,
};

export default ChangeTemperature;
