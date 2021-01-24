import React from 'react';
import './controls.scss';
import PropTypes from 'prop-types';
import RefreshWallPapers from './refreshWallPapers';
import SelectLang from './selectLang';
import ChangeTemperature from './changeTemperature';

const Controls = (props) => {
  const {
    changeBackground, changeLanguage, changeTemperature, language, isFahrenheit,
  } = props;
  return (
    <div className="controls">
      <RefreshWallPapers changeBackground={changeBackground} />
      <SelectLang changeLanguage={changeLanguage} language={language} />
      <ChangeTemperature changeTemperature={changeTemperature} isFahrenheit={isFahrenheit} />
    </div>
  );
};

Controls.propTypes = {
  changeBackground: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  changeTemperature: PropTypes.func.isRequired,
  language: PropTypes.bool.isRequired,
  isFahrenheit: PropTypes.bool.isRequired,
};

export default Controls;
