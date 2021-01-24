import React from 'react';
import './header.scss';
import Controls from '../controls-items/controls';
import Search from '../search/search';

const Header = (data) => {
  const {
    changeBackground, changeLanguage, changeTemperature, language, isFahrenheit, handler,
  } = data;
  return (
    <header className="header">
      <Controls
        changeBackground={changeBackground}
        changeLanguage={changeLanguage}
        changeTemperature={changeTemperature}
        language={language}
        isFahrenheit={isFahrenheit}
      />
      <Search handler={handler} language={language} />
    </header>
  );
};

export default Header;
