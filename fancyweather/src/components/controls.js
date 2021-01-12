import React from 'react';
import RefreshWallPapers from './controls-items/refreshWallPapers';
import SelectLang from './controls-items/selectLang';
import ChangeTemperature from './controls-items/changeTemperature';

const Controls = () => (
  <div className="controls">
    <RefreshWallPapers />
    <SelectLang />
    <ChangeTemperature />
  </div>
);

export default Controls;
