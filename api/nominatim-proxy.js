// This file creates a nominatim proxy backend to properly use reverse geocode according to Nominatim requirements.
// this is required to handle CORS errors, especially since it is being deployed on render

// creating handler to handle location requests
export default async function handler (request, response){

    // creating cnst variables to hold coordinates of requested location
    const {lat,lon} = request.query;

    // creating url with requested coordinates for connection to nominatim in json
    const urlLocation = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}$format=json`;

    // this header is required by nominatim policy
    const nomResponse = await fetch(urlLocation, {
        headers: {"User-Agent": "cs-465-lab2 (medhabi.bista@snhu.edu)"}
    });

    // stores data, reads request body and returns as promise
    // resolves with result of parsing body text as JSON
    // takes json as input and parses to produce Javacript object
    const nomData = await nomResponse.json();

    // allows origin header access, used for cross-origin access request
    // indicates the origin of the server that the cross-origin request is initiated
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json(nomData);


}