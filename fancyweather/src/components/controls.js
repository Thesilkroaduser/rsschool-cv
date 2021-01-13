import React from 'react';
import RefreshWallPapers from './controls-items/refreshWallPapers';
import SelectLang from './controls-items/selectLang';
import ChangeTemperature from './controls-items/changeTemperature';

const Controls = (data) => {
  const handler = data;
  return (
    <div className="controls">
      <RefreshWallPapers handler={handler} />
      <SelectLang />
      <ChangeTemperature />
    </div>
  );
};

export default Controls;
