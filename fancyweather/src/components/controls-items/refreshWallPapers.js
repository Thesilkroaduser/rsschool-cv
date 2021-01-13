import React from 'react';
import refreshIcon from '../../assets/icons/refresh.svg';

const RefreshWallPapers = (data) => {
  const refresh = data.handler.handler;
  return (
    <button type="button" className="change" onClick={refresh}>
      <img className="refresh" src={refreshIcon} alt="refresh" />
    </button>
  );
};

export default RefreshWallPapers;
