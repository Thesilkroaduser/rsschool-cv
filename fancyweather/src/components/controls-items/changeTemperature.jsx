import React from 'react';
import PropTypes from 'prop-types';

const ChangeTemperature = (props) => {
  const { changeTemperature } = props;
  return (
    <div className="sub-controls">
      <button onClick={changeTemperature} type="button" className="farengate inactive temperature">
        &deg;F
      </button>
      <button onClick={changeTemperature} type="button" className="celsius temperature">
        &deg;C
      </button>
    </div>
  );
};

ChangeTemperature.propTypes = {
  changeTemperature: PropTypes.func.isRequired,
};

export default ChangeTemperature;
