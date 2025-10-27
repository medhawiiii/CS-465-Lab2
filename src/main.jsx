// This file is the entry point for the application

// imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// importing leaflet.css file to integrate map components into the project
import 'leaflet/dist/leaflet.css'
// importing gesearch css file
import "leaflet-geosearch/dist/geosearch.css";

// importing fixes for leaflet icons
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

// deleting default icon
delete L.Icon.Default.prototype._getIconUrl;

// creating icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl, iconUrl, shadowUrl,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
