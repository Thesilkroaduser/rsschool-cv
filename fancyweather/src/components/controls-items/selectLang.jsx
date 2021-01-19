import React from 'react';
import PropTypes from 'prop-types';

const SelectLang = (props) => {
  const { changeLanguage } = props;
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select className="lang" onChange={changeLanguage}>
      <option>EN</option>
      <option id="ru">RU</option>
    </select>
  );
};

SelectLang.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default SelectLang;
