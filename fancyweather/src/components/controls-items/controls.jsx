import React from 'react';
import PropTypes from 'prop-types';
import RefreshWallPapers from './refreshWallPapers';
import SelectLang from './selectLang';
import ChangeTemperature from './changeTemperature';

const Controls = (props) => {
  const { changeBackground, changeLanguage, changeTemperature } = props;
  return (
    <div className="controls">
      <RefreshWallPapers changeBackground={changeBackground} />
      <SelectLang changeLanguage={changeLanguage} />
      <ChangeTemperature changeTemperature={changeTemperature} />
    </div>
  );
};

Controls.propTypes = {
  changeBackground: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  changeTemperature: PropTypes.func.isRequired,
};

export default Controls;
