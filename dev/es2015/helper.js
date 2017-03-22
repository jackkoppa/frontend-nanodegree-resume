/*
Helper functions for use in building out the resume
*/

// format date from date objects; takes 2 arguments
function formatDate(rawDate,shortForm = true) {
    if (rawDate) {
        var monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var msg = "";
        var monthsArray = shortForm ? monthsShort : monthsLong;
        msg = monthsArray[rawDate.startMonth - 1] + " " + rawDate.startYear;
        if (rawDate.startMonth !== rawDate.endMonth || rawDate.startYear !== rawDate.endYear) {
            if (rawDate.endYear === null) {
                msg += " - present";
            } else {
                msg += rawDate.endMonth ? " - " + monthsArray[rawDate.endMonth - 1] + " " + rawDate.endYear : "";
            }
        }
        return msg;
    } else {
        return false;
    }
}

// add srcset attribute to img based on config.js imgSize
// first argument is file href, second is an optional custom-defined array of sizes
// (for images not using the Grunt responsive_images task defaults)
function imgSrcSet(imgFile,sizesArray) {
    var srcString = "";
    var srcArray = [];
    if (typeof sizesArray === "undefined") {
        for(var breakpoint in breakpoints) {
            if(breakpoints.hasOwnProperty(breakpoint) && breakpoints[breakpoint] !== null) {
                srcArray.push(imgFile.replace(/\.jpg/, "-" + breakpoints[breakpoint] + ".jpg ") + breakpoints[breakpoint] + "w");
            }
        }
    } else if (Array.isArray(sizesArray)) {
        sizesArray.forEach(function(size) {
            srcArray.push(imgFile.replace(/\.jpg/, "-" + size + ".jpg ") + size + "w");
        });
    } else {
        return "";
    }
    srcArray = srcArray.reverse();
    srcString = srcArray.join(", ");
    return srcString;
}

// add src attribute to img
function imgSrc(imgFile) {
    return imgFile.replace(/\.jpg/, "-" + breakpoints.sm + ".jpg ");
}

// replace all %template% values for the img or imgDiv templates
function imgReplace(src,sizes,alt,sizesArray,div = false,className = "") {
    var string = div ? template.divStart.replace("%class%","image-wrapper %class%") + template.img + template.divEnd : template.img;
    return string
        .replace("%class%",className)
        .replace("%srcset%",imgSrcSet(imgDir + src,sizesArray))
        .replace("%sizes%",sizes)
        .replace("%src%",imgSrc(imgDir + src))
        .replace("%alt%",alt);
}

// replace all %template% values for the img or imgDiv templates
function btnReplace(url = "", linkText = "", target = "_blank", linkClass = "", div = false, divClass = "") {
    var string = div ? template.divStart.replace("%class%","button-wrapper element %class%") + template.buttonLink + template.divEnd : template.buttonLink;
    return string
        .replace("%url%",url)
        .replace("%linkText%",linkText)
        .replace("%target%",target)
        .replace("%linkClass%",linkClass)
        .replace("%class%",divClass);
}










// Click locations
var clickLocations = [];

function logClicks(x,y) {
    clickLocations.push(
        {
            x: x,
            y: y
        }
    );
    console.log('x location: ' + x + '; y location: ' + y);
}



// Map
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

    var locations;

    var mapOptions = {
        disableDefaultUI: true
    };

    /*
    For the map to be displayed, the googleMap var must be
    appended to #mapDiv in resumeBuilder.js.
    */
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);


    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        education.schools.forEach(function(school){
            locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        work.jobs.forEach(function(job){
            locations.push(job.location);
        });

        return locations;
    }

    /*
    createMapMarker(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */
    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat();  // latitude from the place service
        var lon = placeData.geometry.location.lng();  // longitude from the place service
        var name = placeData.formatted_address;   // name of the place from the place service
        var bounds = window.mapBounds;            // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
            // your code goes here!
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
            locations.forEach(function(place){
            // the search request object
            var request = {
                query: place
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        });
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
//window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
//window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
//  map.fitBounds(mapBounds);
//});