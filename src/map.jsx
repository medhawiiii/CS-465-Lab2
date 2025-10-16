// This file defines and sets up the logic for an interactive map

// imports

// importing map components
import { MapContainer, TileLayer } from 'react-leaflet';

// importing leaflet library
import {Icon} from 'leaflet';
// importing leaflet.css for map style for tiles and icons
import 'leaflet/dist/leaflet.css';

// defines the main map component
// is a default export to make
// importation to other files simpler
export default function Map(){

  return(
    // centers map over NYC and sets zoom
    <MapContainer center ={[40.717, -74.000]} zoom = {13}>
    
    </MapContainer>
  )
}
