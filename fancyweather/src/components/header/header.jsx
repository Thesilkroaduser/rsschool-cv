import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import Controls from '../controls-items/controls';
import Search from '../search/search';

const Header = (props) => {
  const {
    changeBackground, changeLanguage, changeTemperature, isRussian, isFahrenheit, handler,
  } = props;
  return (
    <header className="header">
      <Controls
        changeBackground={changeBackground}
        changeLanguage={changeLanguage}
        changeTemperature={changeTemperature}
        isRussian={isRussian}
        isFahrenheit={isFahrenheit}
      />
      <Search handler={handler} isRussian={isRussian} />
    </header>
  );
};

Header.propTypes = {
  changeBackground: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  changeTemperature: PropTypes.func.isRequired,
  isRussian: PropTypes.bool.isRequired,
  isFahrenheit: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Header;
