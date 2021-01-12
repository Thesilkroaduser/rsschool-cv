import React from 'react';

const ChangeTemperature = () => (
  <div className="sub-controls">
    <button type="button" className="farengate inactive">
      &deg;F
    </button>
    <button type="button" className="celsius">
      &deg;C
    </button>
  </div>
);

export default ChangeTemperature;
