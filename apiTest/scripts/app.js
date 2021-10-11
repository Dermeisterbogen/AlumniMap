// We want the geocoder and map to be global so we can access them everywhere
var geocoder;
var map;

// Initializes the map object; main logic goes here:
function initMap() {
    // Initializes the global Geocoder (sends geocode requests to Google)
    geocoder = new google.maps.Geocoder();
    // The location of Mercer in LAT/LNG
    const mercer = { lat: 32.828, lng: -83.651 };
    // Centered the map at Mercer
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: mercer,
    });
    // Add some random markers to demonstrate usability
    addMarker(mercer);
    addressToCoords('Penfield, GA');
    addressToCoords('Atlanta, GA');
    addressToCoords('McDonough, GA');
    addressToCoords('Stone Mountain, GA');
    addressToCoords('Acworth, GA'); // whoop whoop
    addressToCoords('Kennesaw, GA');
    addressToCoords('Marietta, GA');
    addressToCoords('thisIsATestToSeeHowStatusWorks')
}

// Add a marker to the map using Lat/Lng objects
function addMarker(latLng) {
    const marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });
}

// Converts address to coordinates using Geocoding API then adds marker
function addressToCoords(address) {
    // gecode takes in a request and callback function as parameters
    // The first parameter requests an address->coord operation
    // The callback parameter obtains the results and status code from the given operation
    // In this case, the result is an array of objects with ALOT of info, we just want the LAT/LNG from the geometry/location object
    // When we get an OK (valid address->coords), we add the marker, else alert what went wrong
    geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == 'OK') {
            addMarker(results[0].geometry.location);
        } else {
            alert(`Geocode was not successful for -${address}- for the following reason: ${status}`);
        }
    });
}
