import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function MapArea() {
  return (
    <iframe
      src='https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&zoomwheel=false&access_token=pk.eyJ1Ijoic2VyZ2VpZGV2IiwiYSI6ImNramhwcnh1dDEzengzN252YWxxaGtoNWsifQ.zvMZXMVCTZJfVJLVzDQ6zA#15/37.771/-122.436' width='100%' height='400px'>
    </iframe>  
  )
}

