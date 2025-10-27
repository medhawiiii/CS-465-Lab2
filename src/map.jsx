// This file defines and sets up the logic for an interactive map and its functions


/* Imports */
// importing map components and hooks
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
// importing react hook for state management
import { useState, useEffect } from 'react';
// importing leaflet css file
import'leaflet/dist/leaflet.css';
// importing geosearch library for location names and search bar
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
// importing geosearch css file
import 'leaflet-geosearch/dist/geosearch.css';


/* App Functions */

/* Event Handling */
// attaches event handlers to map instance to deal with user's clicks 
function MapClickHandler({onClick}){
  /* test logic
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
  */

  /* setting up event handler for user clicks */
  // attaching click event to handler
  useMapEvents({

    // reacts user clicks on map
    click: (e) => {
      
      // calls on addMemoryMarker() function defined in MyMap
      onClick(e);

    },
  });
  return null;
}

/* Done/Rest Buttons */
// sets handlers and actions for when user clicks on the done/rest buttons
function MapButtons({setAddingMemoryMarkers, setMemoryMarkers, showLocationsList, setShowLocationsList})
  {

  // setting up handler for when done button clicked
  const handleDoneButton = () => {

    // no longer lets user add markers
    setAddingMemoryMarkers(false);

    // close locations list
    setShowLocationsList(false);

  };

  // setting up handler for when rest button clicked
  const handleResetButton = () => {

    // clears markers
    setMemoryMarkers([]);

    // lets user add markers again
    setAddingMemoryMarkers(true);

    // show locations list
    setShowLocationsList(true);
  };

// action to take when done button or reset button, or show/hide locations list button clicked
  return(
    // creating property for buttons 
    <div className = "mapButtons">
      {/* done button */}
      <button onClick = {handleDoneButton}>
        Done Adding Locations
        </button>
      {/* reset button */}
      <button onClick = {handleResetButton}>
        Reset Map
        </button>
      {/* show/hide list button */}
      <button onClick = {() => setShowLocationsList(!showLocationsList)}>
        {showLocationsList ? "Hide Locations List" : "Show Locations List"}
        </button>
    </div>
  );
}

/* Locations List */
// stores the locations where user puts down markers
function LocationsList({ memoryMarkers, markerVisible, editMemory, deleteLocation}){

  // if markers not visible, list should be empty
  if(!markerVisible) return null;

  // creating handler for keeping track of what element is open

  /* creating layout for simple rendering of list of locations */
  return (
    // creating locationList property
    <div className = "locationsList">
      <h2> List of Memories Marked </h2>
      <ul>
       {/* mapping marker index to create list of locations using index and key of markers*/}
        {memoryMarkers.map((marker, locationId) => (
          <li key = {locationId}>
            <strong>"{marker.locationNickname}" </strong>
            {marker.locationLabel}<br/>
            <strong>Memory: </strong>
            {marker.userMemory}
            {/* edit and delete info buttons*/}
            <div className = "listButtons">
              <button onClick={() => editMemory(locationId)}> Edit Memory</button>
              <button onClick={() => deleteLocation(locationId)}> Delete Location </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Search Bar */
// adds search bar to map
function SearchBar({onSearchClick}){

  // allows access to map
  const memMap = useMap();

  useEffect(() => 
  { 
    // creating search bar
    const searchBar = new GeoSearchControl({
      // sets provider
      provider: new OpenStreetMapProvider({
        params: {
          'accept-language':'en;',
        },
        searchUrl: 'https://nominatim.openstreetmap.org/search?'
      }),
      // sets style
      style:'bar',
      // sets marker state
      showMarker: false,
      // sets popup state when 
      showPopup: false,
      // states to/not to auto close result list if a result selected
      autoClose: true,
      // states to keep/not keep selected result in search field
      keepResult: true,
      // states whether or not map re-centers at selected location
      updateMap: true,
    });

    // adding to map
    memMap.addControl(searchBar);

    // listener for location selection
    // allows us to add markers from search bar selection
    memMap.on('geosearch/showlocation', (result) => {

      // sets coordindates and location label to selected location
      const {x: lng, y: lat, label: locationLabel} = result.location;

      // calling function used for map clicks
      onSearchClick({latlng: {lat, lng}, locationLabel});
    })

    // removing componentS ("cleanup logic" for unmounting)
    // required with useEffect()
    return () => {     
      // ensures that component doesn't keep re-rendering/re-running the set-up logic and adding duplicate bars
      memMap.removeControl(searchBar);
      // ensures that show location turns
      memMap.off('geosearch/showlocation');
    };

    // telling to run only once after map first mounts
  }, [memMap, onSearchClick]);
}

/* Map */
// defines the main map component
// default export to make importing simpler
function MyMap(){

/* React Hooks */

    // adding react hook for state variable to store memory markers
    // stores lat. and ln, stores user memory, initialized with empty array
    const [memoryMarkers, setMemoryMarkers] = useState([]);

    // adding react hook to check for whether user is adding/setting memory markers
    // allows to check if user is done adding/wants to reset map
    const [addingMemoryMarkers, setAddingMemoryMarkers] = useState(true);

    // adding react hook to check for whether user has list shown/hidden
    const [showLocationsList, setShowLocationsList] = useState(true);


/* Get Location Name From Coordinates*/

  // gets location name from coordinates
  async function getLocationName(lat, lng) {

    // setting up the reverse geo search
    // calling proxy to fetch data from nominatim (fetches server-side, bypasses CORS)
    const locationProvider = await fetch(`/api/nominatim-proxy?lat=${lat}&lon=${lng}`);

    // waiting for query to match provided coordinates to location name
    const locationResults = await locationProvider.json();

    // if there is a match return the address, else say that location is unknown
    if (locationResults && locationResults.display_name)
    {
      
      // returning location name
      return locationResults.display_name;
    }
    else 
    {
      // stating that location name is unknown
      return "Location unknown.";
    }
  }

/* Add Marker + Prompt User for Memory */

    // adds new markers when user clicks on area in map
    const addMemoryMarker = async (e) => {

      // console logs to check if clicks are registered and to check state 
      console.log(MapClickHandler, e);
      console.log("adding marker:", addingMemoryMarkers);
      // if user clicks done button, no longer add any markers when a location is clicked
      if(!addingMemoryMarkers) return;

      // getting coordinates of location user clicked
      const {lat, lng} = e.latlng;

      // getting location name and storing it
      // get from search label, if no label do a reverse geo search
      const locationLabel = e.locationLabel || e.label || await getLocationName(lat, lng);

      // prompting user for location name
      const locationNickname = prompt("What is this location?");
      // if canceled, stop and don't add marker
      if(locationNickname === null) {
        return;
      };

      // prompting user to input the memory that and storing it
      const memoryAtLocation = prompt(`What does this location-- ${locationNickname} --mean to you?`);
      // if canceled, stop and don't add marker 
      if(memoryAtLocation === null) {
        return;
      };
     
      // creating const memory to contain location + message saying no memory when no location
      const userMemory = memoryAtLocation || "No memory written.";

      // set marker at location with pop-up of location and memory
        setMemoryMarkers(prev=> [...prev, {lat, lng, locationNickname, locationLabel, userMemory}]);      
    };

/* Handle Editing and Deleting Information */
  
  // adding handler for editing information
  const handleMemoryEdit = (locationId) => {

        
    // prompting for updated nickname
    const nicknameUpdate = prompt ("Enter nickname update.");
    
    // prompting for updated memory
    const memoryUpdate = prompt ("Enter memory update.");

    // if user cancels, don't update
  if (nicknameUpdate === null && memoryUpdate === null) {return;};

    // update nickname/memory
      // update memory/nickname without changing position of location on list
      setMemoryMarkers((prev) => 
      prev.map((marker, memoryId) => memoryId === locationId ? {...marker, 
      locationNickname: nicknameUpdate || marker.locationNickname, 
      userMemory: memoryUpdate || marker.userMemory}: marker));}

    // adding handler for deleting information
    // filtering easiest method to remove item from array
    // essentialy produces new array that doesn't have that location/memory
  const handleLocationDelete = (locationId) => {

    // if user agrees to delete memory, delete memory
    if(window.confirm("Delete Location?")){
      // filter out and delete location
      setMemoryMarkers((prev) => prev.filter((_, ID) => ID !== locationId));}
  };

  /* Map Rendering Logic */
  return(
    // wrapping in <div> because react requires only one root element
    // we have two: MapButtons and MapContainer
    <div>

    {/* adding done, reset, and show/hide list of locations buttons */}
    <MapButtons
      setAddingMemoryMarkers = {setAddingMemoryMarkers}
      setMemoryMarkers = {setMemoryMarkers}
      memoryMarkers = {memoryMarkers}
      showLocationsList = {showLocationsList}
      setShowLocationsList = {setShowLocationsList}
    />

    {/* adding locations list */}
    <LocationsList 
    memoryMarkers = {memoryMarkers} 
    markerVisible = {showLocationsList}
    editMemory={handleMemoryEdit}
    deleteLocation={handleLocationDelete}
    />


    {/* creating basic map layout and centering map over NYC, sets zoom, and sets as map instance upon creation */}
    <MapContainer center ={[40.717, -74.000]} zoom = {13}>

    {/* adding map tiles (visual representation of map) */}
    <TileLayer

    // giving proper credit to Open Street Map since they are the source of our map
      attribution='&copy; <a 
      href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    {/* Add Components to Map*/}

    {/* adding search bar */}
    <SearchBar onSearchClick={addMemoryMarker}/>

    {/* adding click handler function for when user clicks on map*/}
    <MapClickHandler onClick={addMemoryMarker}/>

    {/* loops through all stored markers/adds marker to location clicked by user */}
    {memoryMarkers.map((marker, locationId) => (

      // assigning key to give each marker a unique key
      <Marker key = {locationId} position = {[marker.lat, marker.lng]}>

        {/* adds popup with user's memory, coord. of location, and location*/}
          <Popup> 
          <strong>Location:</strong> {marker.locationLabel}<br/>
          <br/><strong>Location Nickname:</strong> {marker.locationNickname}<br/>
          <br/><strong>Memory:</strong> {marker.userMemory}<br/>
          </Popup>

      </Marker>
    ))}

    </MapContainer>
    </div>
  )
}

export default MyMap;