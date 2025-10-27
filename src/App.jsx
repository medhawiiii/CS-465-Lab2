// This file sets up the page header and deals with rendering the map

import React from 'react';
// importing map from map.jsx file
import MyMap from './map.jsx';
import './App.css';

// importing map components
// import { MapContainer, TileLayer} from 'react-leaflet';

function MapApp(){
  return ( 
  <>
   {/* creating page header */}
  <h1> Oh, All the Memories!</h1>

  {/* rendering map */}
  <MyMap/>
  </>
);
}

export default MapApp;

