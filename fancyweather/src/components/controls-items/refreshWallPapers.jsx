import React from 'react';
import PropTypes from 'prop-types';
import refreshIcon from '../../assets/icons/refresh.svg';

const RefreshWallPapers = (props) => {
  const { changeBackground } = props;
  return (
    <button type="button" className="change" onClick={changeBackground}>
      <img className="refresh" src={refreshIcon} alt="refresh" />
    </button>
  );
};

RefreshWallPapers.propTypes = {
  changeBackground: PropTypes.func.isRequired,
};

export default RefreshWallPapers;
