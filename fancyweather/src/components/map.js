import React from 'react';
import ReactMapGL from 'react-map-gl';

function MapArea(data) {
  const { mapSettings } = data.mapSettings;
  // State for Coords
  const coords = {
    lat: mapSettings.latitude,
    lng: mapSettings.longitude,
    minsLt: 0,
    minsLg: 0,
  };
  // State for Map
  // const [viewport, setViewport] = useState(mapSettings);
  const viewport = mapSettings;

  return (
    <div className="location-wrapper">
      <div className="map-wrapper">
        <ReactMapGL
          className="map"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic2VyZ2VpZGV2IiwiYSI6ImNramlpZjlxMzE5dmEyc2xvcjJ2czg2OGYifQ.75myhpcDhNYozJjZXFmsVg"
          mapStyle="mapbox://styles/sergeidev/ckjiiqeehfnis19o53a59pdmy"
          // onViewportChange={(view) => {
          //   setViewport(view);
          // }}
        />
      </div>
      <div className="coords">
        <p className="coords__item">
          latitude:
          {' '}
          {coords.lat}
          &deg;
          {coords.minsLt}
          `
        </p>
        <p className="coords__item">
          longitude:
          {' '}
          {coords.lng}
          &deg;
          {coords.minsLg}
          `
        </p>
      </div>
    </div>
  );
}

export default MapArea;
