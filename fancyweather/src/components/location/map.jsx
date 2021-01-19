import React from 'react';
import ReactMapGL from 'react-map-gl';
import { getMins } from '../../helpers/helpers';

function MapArea(props) {
  const mapProps = props;
  const { mapSettings, language } = mapProps.mapSettings;
  const coords = {
    lat: mapSettings.latitude,
    lng: mapSettings.longitude,
  };
  return (
    <div className="location-wrapper">
      <div className="map-wrapper">
        <ReactMapGL
          className="map"
          latitude={mapSettings.latitude}
          longitude={mapSettings.longitude}
          width={mapSettings.width}
          height={mapSettings.height}
          zoom={mapSettings.zoom}
          mapboxApiAccessToken="pk.eyJ1Ijoic2VyZ2VpZGV2IiwiYSI6ImNramlpZjlxMzE5dmEyc2xvcjJ2czg2OGYifQ.75myhpcDhNYozJjZXFmsVg"
          mapStyle="mapbox://styles/sergeidev/ckju8q4se134r1ao0eo42a3s5"
        />
      </div>
      <div className="coords">
        <p className="coords__item">
          {`${language ? 'Широта:' : 'latitude:'}`}
          {' '}
          {Math.trunc(coords.lat)}
          &deg;
          {getMins(coords.lat)}
          `
        </p>
        <p className="coords__item">
          {`${language ? 'Долгота:' : 'longitude:'}`}
          {' '}
          {Math.trunc(coords.lng)}
          &deg;
          {getMins(coords.lng)}
          `
        </p>
      </div>
    </div>
  );
}

export default MapArea;
