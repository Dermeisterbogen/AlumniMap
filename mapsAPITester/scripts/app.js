// We want the geocoder and map to be global so we can access them everywhere
let geocoder;
let map;
let markers = [];

// Initializes the map object; main logic goes here:
function initMap() {
    // Initializes the global Geocoder (sends geocode requests to Google)
    geocoder = new google.maps.Geocoder();
    // The location of Mercer in LAT/LNG
    const centerOfUS = { lat: 39.191667, lng: -96.591667 };
    // Centered the map at Mercer
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: centerOfUS,
    });
    
    addAlumni();
}

// Add a marker to the map using Lat/Lng objects
function addMarker(latLng, alum) {
    // Create the marker and place at latLng
    const marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });

    // Create the Infoindow and attach its content to it 
    const contentString = '<h1>' + alum.name + '</h1>' +
                          '<p>Graduation Date:' + alum.gradDate + '</p>' +
                          '<p>Major: ' + alum.major + '</p>' +
                          '<p>Workplaces: ' + alum.workplaces + '</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    // Add a click event to the marker that will open the InfoWindow
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

    markers.push(marker);
}

// Converts address to coordinates using Geocoding API then adds marker
function addressToCoords(alum) {
    // gecode takes in a request and callback function as parameters
    // The first parameter requests an address->coord operation
    // The callback parameter obtains the results and status code from the given operation
    // In this case, the result is an array of objects with ALOT of info, we just want the LAT/LNG from the geometry/location object
    // When we get an OK (valid address->coords), we add the marker, else alert what went wrong
    const address = alum.workplaces;
    geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == 'OK') {
            addMarker(results[0].geometry.location, alum);
        } else {
            alert(`Geocode was not successful for -${address}- for the following reason: ${status}`);
        }
    });
}

// Populates the map with markers correlating to alumni locations/information
function addAlumni() {
    const alumni = []

    fetch('<uri>')
        .then(res => res.json())
        .then(people => showPeople(people.results));

    showPeople = people => {
        people.forEach(person => {
            alumni.push(person);
        })
    }


    // Add them all to the map 
    for (let i = 0; i < alumni.length; i++) {
        addressToCoords(alumni[i]);
    }
}
