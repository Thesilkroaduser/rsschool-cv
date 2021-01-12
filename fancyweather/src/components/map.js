import React, { useState } from "react"
import ReactMapGL from "react-map-gl"

function MapArea() {
  const mapSettings = {
    latitude: 0,
    longitude: 0,
    width: "22vw",
    height: "40vh",
    zoom: 9,
  }

  // State for Coords
  const [coords, setCoords] = useState({
    lat: mapSettings.latitude,
    lng: mapSettings.longitude,
    minsLt: 0,
    minsLg: 0,
  })
  // State for Map
  const [viewport, setViewport] = useState(mapSettings)

  const success = (pos) => {
    const crd = pos.coords
    const lat = crd.latitude
    const lng = crd.longitude
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
    setCoords({
      lat: `${Math.trunc(lat)}`,
      lng: `${Math.trunc(lng)}`,
      minsLt: `${Math.trunc((lat % 1) * 100)}`,
      minsLg: `${Math.trunc((lng % 1) * 100)}`,
    })
  }

  const error = () => {
    alert("Разрешите использование геолокации для получения данных")
  }

  navigator.geolocation.getCurrentPosition(success, error)
  return (
    <div className="location-wrapper">
      <div className="map-wrapper">
        <ReactMapGL
          className="map"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic2VyZ2VpZGV2IiwiYSI6ImNramlpZjlxMzE5dmEyc2xvcjJ2czg2OGYifQ.75myhpcDhNYozJjZXFmsVg"
          mapStyle="mapbox://styles/sergeidev/ckjiiqeehfnis19o53a59pdmy"
          onViewportChange={(view) => {
            setViewport(view)
          }}
        />
      </div>
      <div className="coords">
        <p className="coords__item">
          latitude: {coords.lat}&deg;{coords.minsLt}`
        </p>
        <p className="coords__item">
          longitude: {coords.lng}&deg;{coords.minsLg}`
        </p>
      </div>
    </div>
  )
}

export default MapArea
