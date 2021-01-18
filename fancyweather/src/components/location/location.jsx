import React from 'react';

import MapArea from './map';

const LocationSection = (props) => (
  <section className="section">
    <MapArea mapSettings={props} />
  </section>
);
export default LocationSection;
