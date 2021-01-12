import React from 'react';
import refreshIcon from '../../assets/icons/refresh.svg';

const RefreshWallPapers = () => (
  <button type="button" className="change">
    <img className="refresh" src={refreshIcon} alt="refresh" />
  </button>
);

export default RefreshWallPapers;
