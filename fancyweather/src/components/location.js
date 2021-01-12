import React from 'react';
import Search from './search';
import MapArea from './map';

const LocationSection = (data) => (
  <section className="section">
    <Search />
    <MapArea mapSettings={data} />
  </section>
);
export default LocationSection;
