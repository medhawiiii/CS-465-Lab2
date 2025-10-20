// This file defines and sets up the logic for an interactive map

// imports

// importing map components and hook
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
// importing react hook
import { useState } from 'react';
// importing leaflet css file
import'leaflet/dist/leaflet.css';


// attaches event handlers to map instance to deal with user's clicks
// getting 
function MapClickHandler(){
  const memoryClick = useMapEvents({
    click: ()=>{
      memoryClick.locate()
    },
    // logging location of click
    locationFound: (location) => {
      // checking that function is working (for debugging purposes)
      console.log('location found: ', location)
    },
  })
  return null
}

// defines the main map component
// default export to make importing simpler
function Mymap(){

    // adding react hook for state variable to store memory markers
    // stores lat. and ln
    // stores user memory
    // inializing with empty array
    const [memoryMarkers, setMemoryMarkers] = useState([]);

  return(
    // centering map over NYC, sets zoom
    <MapContainer center ={[40.717, -74.000]} zoom = {13}>

    {/* adding map tiles (visual representation of map) */}
    <TileLayer
    // giving proper credit to Open Street Map since they are the source of our map
      attribution='&copy; <a 
      href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* adding click handler function */}
    <MapClickHandler/>

    </MapContainer>
  )
}

export default Mymap;
