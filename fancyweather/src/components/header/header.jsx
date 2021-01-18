import React from 'react';
import Controls from '../controls-items/controls';
import Search from '../search/search';

const Header = (data) => {
  const {
    changeBackground, changeLanguage, changeTemperature, language, handler,
  } = data;
  return (
    <header className="header">
      <Controls
        changeBackground={changeBackground}
        changeLanguage={changeLanguage}
        changeTemperature={changeTemperature}
      />
      <Search handler={handler} language={language} />
    </header>
  );
};

export default Header;
