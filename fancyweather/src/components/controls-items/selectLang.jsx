import React from 'react';
import PropTypes from 'prop-types';

const SelectLang = (props) => {
  const { changeLanguage, isRussian } = props;
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select className="lang" value={isRussian ? 'RU' : 'EN'} onChange={changeLanguage}>
      <option value="EN">EN</option>
      <option value="RU">RU</option>
    </select>
  );
};

SelectLang.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  isRussian: PropTypes.bool.isRequired,
};

export default SelectLang;
