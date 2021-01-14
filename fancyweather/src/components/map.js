import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function MapArea(data) {
  const { mapSettings } = data.mapSettings;
  const coords = {
    lat: mapSettings.latitude,
    lng: mapSettings.longitude,
  };
  const [viewport, setViewport] = useState(mapSettings);
  return (
    <div className="location-wrapper">
      <div className="map-wrapper">
        <ReactMapGL
          className="map"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic2VyZ2VpZGV2IiwiYSI6ImNramlpZjlxMzE5dmEyc2xvcjJ2czg2OGYifQ.75myhpcDhNYozJjZXFmsVg"
          mapStyle="mapbox://styles/sergeidev/ckju8q4se134r1ao0eo42a3s5"
          onViewportChange={(view) => {
            setViewport(view);
          }}
        />
      </div>
      <div className="coords">
        <p className="coords__item">
          latitude:
          {' '}
          {Math.trunc(coords.lat)}
          &deg;
          {coords.lat < 0
            ? Math.trunc((-coords.lat % 1) * 100) : Math.trunc((coords.lat % 1) * 100)}
          `
        </p>
        <p className="coords__item">
          longitude:
          {' '}
          {Math.trunc(coords.lng)}
          &deg;
          {coords.lng < 0
            ? Math.trunc((-coords.lng % 1) * 100) : Math.trunc((coords.lng % 1) * 100)}
          `
        </p>
      </div>
    </div>
  );
}

export default MapArea;
