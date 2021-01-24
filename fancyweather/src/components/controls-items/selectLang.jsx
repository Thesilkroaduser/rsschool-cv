import React from 'react';
import PropTypes from 'prop-types';

const SelectLang = (props) => {
  const { changeLanguage, language } = props;
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select className="lang" value={language ? 'RU' : 'EN'} onChange={changeLanguage}>
      <option value="EN">EN</option>
      <option value="RU">RU</option>
    </select>
  );
};

SelectLang.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.bool.isRequired,
};

export default SelectLang;
