# Lab 2: Oh, All The Memories (also known as: Oh, the places you've been!)
- Developer: Medhawi Bista
- GitHub: @medhawiiii
- Repository: https://github.com/medhawiiii/CS-465-Lab2 
- Collaborator(s): Charles Palmer, Instructor

## Purpose
The purpose of this lab was to create a simple interactive and reactive map using React, JavaScript, the Leaflet API, OpenStreetMap, CSS, and Vite. The website was deployed on render.com.

## Running the App
To run and deploy this application, users can simply follow the set-up process from React and Vite. They can also just do the following:

- Clone repository
- Use npm install to install the dependencies
- Run locally with npm run dev
- Deploy using render.com 

## What To Expect After Running
After the application is up and running, users are able to put markers on the locations they select, input nicknames for the location and write down their memory at the location. The markers have pop-ups that have the nickname and memory, as well as the exact address of their marker. We got the exact location by reverse geocoding. As the user puts down markers it gets added to a list of the locations and their memories. 

Once they hit the done button, they can no longer add markers, and the list of their locations is hidden. When they hit the reset button, the map is wiped out and the users can now put down new markers and view the list again. Users are able to edit their individual memories and delete the locations directly from the list. They are also able to show and hide the map list, even before or after the done button has been clicked. 

## Extra Features
Search Bar: I utilized the leaflet-geoserch library to add a search function to the map. Users are able to enter an exact location into the search bar, which is present at the top of the map at all times, and the once they select a location it will take them to that location and put down a marker. They will be prompted the same way as they would when they click on the map to put down a marker. It integrates into the same array as the user-clicked markers and behaves identically. They are able to edit and delete the markers in the exact same way.
Reverse Geocoding to get exact location address--fits into extra feature #3--I utilized the Nominatim API through leaflet-geosearch to reverse geocode the exact location names for the locations that the markers are put down. This information is stored in the pop-up and list with the location nickname and user’s memory.
Close and Reopen List of Locations: As stated before, users are able to close and open the list of locations at any time. This was not a required function in the base requirements, but made sense for me. The list also scrolls if it gets too long.
Edit and Delete Location: Again, as previously stated, once a location is added, users are able to edit the memory or delete the location directly from the locations list, even after the done button is clicked (this only stops users from adding more markers).
Responsive Styling: While it was part of base requirements, I made sure that the application utilized responsive styling. This was done by using things like media queries so that the map is adaptable for both mobile and desktop layouts. I also added hover effects for the buttons and made the list scrollable. The coloring of the application is cohesive and matching as well.

## Struggles and Challenges
My biggest struggle was being unfamiliar with most of the tools we were to use for this lab. I spent a lot of time looking through the official documents, as well as other resources like stackoverflow, GitHub, and W3Schools, to figure out how to do the things I wanted/ needed the map to be doing. I also looked for examples that were available where people did similar things to what I was trying to do with the map, and the components on the map. Then I cross-referenced with the official docs to find the different parts, and to better understand them, and went from there. Approaching it this way helped me to really understand what I was doing for each piece of the lab. I have a much better understanding of how to properly implements components, event handlers, and how to work with state management within React, while dealing with dynamically rendering a Leaflet map. 

Other challenges I faced was getting the map and events to render correctly in React. At first, the maps wouldn’t appear or wouldn’t respond to user actions the way it was supposed. I made sure to go back and check the documents, then simplified imports, checked component structure, and double-checked that the map container was properly wrapped in its element. I also had trouble with getting certain elements, like the marker icons to show up and for the search bar to function and be properly visual. The icon issue was one that occured for many people, and had been written about in the docs, so I simply followed the solution that had been proven to work. I realized the search bar was mainly a styling issue and remedied that by updating the CSS for the search bar, and double checked that it was communicating properly with nominatim. Another issue was the reverse geocode to work properly with Nominatim. This is due to restrictions on how it could be used. I figured out solutions by following the official documents after looking into the error and re-reading the use restrictions. The bulk of the issues really came after deployment. I just did my best to work through them and figure it out one issue at a time.

Beyond technical challenges, I have been dealing with personal circumstances, challenges, and issues (mainly family and health) that heavily affected and hindered my ability to work on the lab. Despite what is happening, I simply just kept working consistently, whenever I was able to, until I completed the lab. During this I made sure that I was reading the documents to ensure I was doing things correctly and to make sure I understood what was happening (and to double check an example I’d found or seen), and testing each new piece and feature I added before moving. 

## Getting Here
To set up and complete this project I used knowledge that I gained during lectures held at Southern New Hampshire University with Professor Charles Palmer, as well as official documentation and guides from Vite, React, Leaflet, Mozilla, and other official and educational sources. As I worked, I kept a list of the specific resources I utilized, both for the lab, and to use as a future reference for myself in general.

## Resources Utilized

### Vite/Project Setup & React
-https://vite.dev/guide/#scaffolding-your-first-vite-project
-http://react-leaflet.js.org/docs/start-introduction/
-https://reactjs.org/docs/getting-started.html
 
### React: 
https://react.dev/learn/your-first-component
-https://react.dev/learn/importing-and-exporting-components
-https://react.dev/reference/react-dom/client/createRoot
-https://react.dev/learn/state-a-components-memory
-https://react.dev/learn/conditional-rendering
-https://react.dev/learn/responding-to-events
-https://react.dev/learn/sharing-state-between-components
-https://react.dev/learn/passing-props-to-a-component
-https://react.dev/learn/updating-arrays-in-state
-https://react.dev/learn/updating-objects-in-state#updating-a-nested-object
-https://react.dev/learn/rendering-lists
-https://react.dev/learn/synchronizing-with-effects
-https://react.dev/reference/react/useState
-https://react.dev/reference/react/useEffect

### Leaflet, React Leaflet & OpenStreetMap API:
-https://www.openstreetmap.org/ 
-https://leafletjs.com/  
-https://react-leaflet.js.org/
-https://react-leaflet.js.org/docs/example-events/
-https://leafletjs.com/reference.html
-https://leafletjs.com/examples.html
-https://leafletjs.com/reference.html#popup
-https://leafletjs.com/reference.html#marker
-https://leafletjs.com/reference.html#map-click
-https://github.com/PaulLeCam/react-leaflet/issues/453
-https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-633219087 


### Geosearch & Reverse Geocode:
-https://github.com/smeijer/leaflet-geosearch
-https://leaflet-geosearch.meijer.works/usage
-https://leaflet-geosearch.meijer.works/providers/openstreetmap
-https://nominatim.org/release-docs/latest/api/Reverse/
-https://operations.osmfoundation.org/policies/nominatim/
-https://allorigins.win/ 

### CSS, JavaScript & Mozilla: 
-https://www.w3schools.com/cssref/css_selectors.php
-https://www.w3schools.com/css/css3_buttons.asp
-https://www.w3schools.com/css/css_rwd_mediaqueries.asp
-https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
-https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
-https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
-https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries
-https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API 
-https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
-https://developer.mozilla.org/en-US/docs/Web/API/Request/json
-https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent 

I also used/sourced code from the following tutorials to help me better understand how to use documentation for React and Leaflet to create a map like the one required for the lab, and to make sure code was being properly implemented:

### Tutorials, Guides & Examples: 
-https://www.youtube.com/watch?v=jD6813wGdBA
-https://reactjsexample.com/setting-up-a-basic-leaflets-js-map-in-react/
-https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202
-https://stackoverflow.com/questions/64953981/react-leaflet-the-name-of-the-place-not-the-coordinates
-https://stackoverflow.com/questions/8715860/what-does-mean-in-css


## Final Thoughts and Acknowledgements
Overall, while I had plenty of struggles and hurdles in my path, I learned a lot of things while working on this assignment and have begun to gain a better understanding of all the tools used for this lab. In the future I want allow the users to save their lists and then load it back in. 

I pledge that this project was written solely by me using only what I learned in class and what knowledge I gained from official documents, guides, and examples, and was done to the best of my ability as a beginner.
