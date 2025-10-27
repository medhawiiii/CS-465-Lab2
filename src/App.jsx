// This file sets up the page header and deals with rendering the map

// importing map from map.jsx file
import MyMap from './map.jsx';
import './App.css';

// importing map components
// import { MapContainer, TileLayer} from 'react-leaflet';

function MapApp(){
  return ( 
  <>
   {/* creating page header */}
   <div className='pageHeader'> 
      <h1> Oh, All the Memories!</h1>
   </div>
      {/* creating second header */}
      <div className='secondHeader'> 
      <h2> A map to put down your favourite spots and memories.</h2>
   </div>

  {/* rendering map */}
  <MyMap/>
  </>
);
}

export default MapApp;

