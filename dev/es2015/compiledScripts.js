/*
A few changeable, essential project setup variables (only affect client-side functions, not Grunt setup)
*/

// Maximum number of items to display
// Jobs
var maxJobs = 4;
// Project
var maxProjects = 4;
var maxProjectImgs = 4;

// Base image directory
var imgDir = "responsive_images/";

var breakpoints = {
    xs: null,
    sm: 480,
    md: 640,
    lg: 900,
    xl: 1200
}
/*
Simple template variables, stored withing template object
*/

var template = {};

template.bio = {
    // Header templates
    name: '<h1 class="element">%name%</h1>',
    role: '<h2 class="role element">%role%</h2>',
    welcomeMsg: '<h4 class="element">%welcomeMsg%</h4>',
    summaryMsg: '<p class="element center box-xs-12 box-lg-8 box-xl-6">%summaryMsg%</p>',

    // Contacts templates
    contacts: '<ul id="top-contacts-list" class="tile-list links-list element"></ul>',
    contact: '<li><a href="%contactLink%" target="%target%"><i class="icon icon-%contact%"></i><span class="%class%">%contactDisplay%</span></a></li>',

    // Skills templates
    skills: '<ul id="skills-list" class="tile-list element"></ul>',
    skill: '<span>%skill%</span>',
    skillIcon: '<i class="icon icon-%skillSmall%"></i>'
}
template.bio.skillLi = '<li class="skill-item">' + template.bio.skillIcon + template.bio.skill + '</li>';

// Education templates
template.education = {
    startSpacer: '<div class="spacer box-xs-1"></div>',
    elementStart: '<div class="education card %class% container box-xs-11 box-md-10 box-lg-9"><div class="card-inner container">',
    linkStart: '<div href="%url%" target="_blank">',
    school: '<h4>%school%</h4>',
    location: '<span class="location">%location%</span>',
    degree: '<h5 class="major">%degree%%major%</h5>',
    minor: '<span class="minor">Minor - %minor%</span>',
    dates: '<span class="dates">%dates%</span>',
    details: '<div class="details-wrapper accordion">%header%<ul class="accordion-content">%details%</ul></div>',
    detail: '<li class="detail">%detail%</li>',
    elementEnd: '</div></div>',
    endSpacer: '<div class="spacer box-md-1 box-lg-2"></div>'
}

// Work templates
template.work = {
    startSpacer: '<div class="spacer box-xs-1"></div>',
    elementStart: '<div class="job card %class% container box-xs-11 box-md-10 box-lg-9"><div class="card-inner container">',
    linkStart: '<a href="%url%" target="_blank">',
    employer: '<h4>%employer%</h5>',
    location: '<span class="location">%location%</span>',
    dates: '<span class="dates">%dates%</span>',
    title: '<h5 class="title">%title%</h5>',
    description: '<div class="details-wrapper accordion">%header%<p class="accordion-content">%description%</p></div>',
    linkEnd: '</a>',
    elementEnd: '</div></div>',
    endSpacer: '<div class="spacer box-md-1 box-lg-2"></div>'
}

// Project templates

// Footer templates

// General templates
//// Div templates
template.fullDiv = '<div class="%class%"></div>';
template.divStart = '<div class="%class%">';
template.divEnd = '</div>';
//// Image templates
template.img = '<img srcset="%srcset%" sizes="%sizes%" src="%src%" alt="%alt%" >';
template.divImg = '<div class="image-wrapper %class%">' + template.img + '</div>';
//// Dividers
template.bar = '<span class="bar">|</span>';
//// Links
template.buttonLink = '<a class="link-button %linkClass%" href="%url%" target="%target%"><button>%linkText%</button></a>';
//// Header for expanding accordions
template.accordionHeader = '<p class="accordion-header">%title% <i class="icon-plus"></i><i class="icon-minus"></i></p>'

// set tpl equal to base object (local tpl vars are defined within each object in resumeBuilder.js)
var tpl = template;
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
/*
Functions for scripting interaction
*/

function handleAccordionClick(e) {
	var $accordion = e.parent(".accordion");
	$accordion.toggleClass("open");
}
/*
Store resume.data in 4 accessible objects, and append templates to index.html
*/

/*
An implementation of this project drawing from a centralized JSON feed would use something like
the following AJAX call to pull in resume.json data. This project, though, makes use of the
`grunt compileJS` function in the `resume-data` repo, which will output a resume.js file.
resume.js is then directly concatenated into resumeScripts.js file, so it's accessible below.
*/
/*
var resume = {}
resume.data = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./resume-data/resume.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
*/
var bio = resume.data.bio;
var education = resume.data.education;
var work = resume.data.work;
var projects = resume.data.projects;

bio.display = function() {
    var tpl = template.bio;
    var topContacts = ["email","mobile","location","twitter","linkedin","github"];

    function prepareContact(contact,contacts) {
        var contactDisplay = contacts[contact];
        var contactLink = "";
        var className = "";
        var target = "_blank";
        switch (contact) {
            case "mobile" :
                contactLink = "tel:+" + contactDisplay.replace(/([\D])/g,"");
                break;
            case "email" : 
                contactLink = "mailto:" + contactDisplay;
                break;
            case "github" :
                contactLink = "https://github.com/" + contactDisplay;
                className = "hide-xs show-md";
                break;
            case "twitter" :
                contactLink = "https://twitter.com/" + contactDisplay;
                className = "hide-xs show-md";
                break;
            case "linkedin" :
                contactLink = "https://linkedin.com/in/" + contactDisplay;
                className = "hide-xs show-md";
                break;
            case "location" :
                contactLink = "#map-div";
                target = "_self";
                break;
            default :
                contactLink = "";
                break;
        }
        if (contactLink === "") { return false }
        else {
            return tpl.contact
                .replace("%contactLink%",contactLink)
                .replace("%contact%",contact)
                .replace("%target%",target)
                .replace("%class%",className)
                .replace("%contactDisplay%",contactDisplay);
        }
    }
    // start #header
    $("#banner-wrapper").append(imgReplace( // in helper.js
        this.headerpic,
        "100vw",
        this.name,
        [480,640,900,1200,1800]));
    // extra cover image to show blur on supporting browsers
    $("#banner-wrapper").append(imgReplace(
        this.headerpic,
        "100vw",
        this.name,
        [480,640,900,1200,1800],
        true,
        "blur-cover box-xs-7 box-lg-6"));
    $("#logo-wrapper").append(imgReplace(
        this.logo,
        "",
        this.name + " Logo",
        false));
    $("#intro").append(tpl.name.replace("%name%",this.name));
    $("#intro").append(tpl.role.replace("%role%",this.role));
    $("#intro").append(tpl.contacts);
    topContacts.forEach(function(contact) {
        $("#top-contacts-list").append(prepareContact(contact,bio.contacts));
    });
    
    $("#summary").append(tpl.welcomeMsg.replace("%welcomeMsg%",this.welcomeMessage));
    $("#summary").append(tpl.summaryMsg.replace("%summaryMsg%",this.personalSummary));
    // end #header

    // start #main
    $("#skills").append(tpl.skills);
    this.skills.forEach(function(skill,index,skills) {
        $("#skills-list").append(tpl.skillLi
            .replace("%skill%",skill)
            .replace("%skillSmall%",skill.toLowerCase().replace(/\s|\.\w+/g,""))
            );
    });
}

education.display = function() {
    var tpl = template.education;
    function prepareSchool(school,i,array) {
        var physical = school.location ? true : false;
        var schoolType = physical ? "School" : "Program";
        var name = school.name ? school.name : (school.school ? school.school : "");
        var final = i >= array.length - 1;
        var output = "";
        output += tpl.startSpacer;
        output += physical ? tpl.elementStart.replace("%class%","physical-school") : (final ? tpl.elementStart.replace("%class%","online-program last") : tpl.elementStart.replace("%class%","online-program"));
        if(school.logo) {
            output += imgReplace(
                school.imgDir + school.logo,
                "",
                name + " Logo",
                false,
                true,
                "logo-wrapper element");
        }
        output += template.divStart.replace("%class%","basics element");
        output += tpl.school.replace("%school%",name);
        output += physical ? tpl.location.replace("%location%",school.location) : "";
        output += physical && school.dates ? template.bar : "";
        output += school.dates ? tpl.dates.replace("%dates%",formatDate(school.dates)) : "";
        if (school.degree && Array.isArray(school.major)) {
            school.major.forEach(function(major) {
                output += tpl.degree
                    .replace("%degree%",school.degree)
                    .replace("%major%"," - " + major);
            });
        } else if (school.title) {
            output += tpl.degree.replace("%degree%%major%",school.title);
        }
        output += school.minor ? tpl.minor.replace("%minor%",school.minor) : "";
        
        if (school.details) {
            output += tpl.details
                .replace("%details%", function() {
                    var detailList = "";
                    school.details.forEach(function(detail) {
                        detailList += tpl.detail.replace("%detail%",detail);
                    });
                    return detailList;
                })
                .replace("%header%",template.accordionHeader.replace("%title%","Highlights"));
        }  
        output += template.divEnd;      
        output += school.url ? btnReplace(school.url, "Vist " + schoolType + " Site", "_blank", "flat", true, "box-xs-12") : "";
        output += tpl.elementEnd;
        output += tpl.endSpacer;
        return output;
    }
    this.schools.forEach(function(school,index,schools) {
        $("#education").append(prepareSchool(school,index,schools));
    });
    this.onlineCourses.forEach(function(school,index,schools) {
        $("#education").append(prepareSchool(school,index,schools));
    });
}

work.display = function() {
    var tpl = template.work;
    function prepareJob(job,i,array) {
        var final = i >= array.length - 1;
        var output = "";
        output += final ? tpl.elementStart.replace("%class%","last") : tpl.elementStart.replace("%class%","");
        if (job.logo) {
            output += imgReplace(
                job.imgDir + job.logo,
                "",
                job.employer + " Logo",
                false,
                true,
                "logo-wrapper element");
        }
        output += template.divStart.replace("%class%","basics element");
        output += tpl.employer.replace("%employer%",job.employer);
        output += tpl.location.replace("%location%",job.location);
        output += job.dates ? template.bar + tpl.dates.replace("%dates%",formatDate(job.dates)) : "";
        output += tpl.title.replace("%title%",job.title);        
        output += tpl.description
            .replace("%description%",job.description)
            .replace("%header%",template.accordionHeader.replace("%title%","Summary"));
        output += template.divEnd;
        if (job.urls.companySite && job.urls.projectSite) {
            output += template.fullDiv.replace("%class%","spacer hide-xs show-lg box-lg-2");
            output += btnReplace(job.urls.companySite.url, job.urls.companySite.siteType + " Site", "_blank", "flat", true, "box-xs-12 box-md-6 box-lg-4");
            output += btnReplace(job.urls.projectSite.url, "Related " + job.urls.projectSite.siteType, "_blank", "flat", true, "box-xs-12 box-md-6 box-lg-4");
            output += template.fullDiv.replace("%class%","spacer hide-xs show-lg box-lg-2");
        } else if (job.urls.companySite) {
            output += btnReplace(job.urls.companySite.url, job.urls.companySite.siteType + " Site", "_blank", "flat", true, "box-xs-12");            
        } else if (job.urls.projectSite) {
            output += btnReplace(job.urls.projectSite.url, "Related " + job.urls.projectSite.siteType, "_blank", "flat", true, "box-xs-12");            
        }
        output += tpl.elementEnd;  
        return output;
    }
    this.jobs.forEach(function(job,index,jobs) {
        $("#work").append(prepareJob(job,index,jobs));
    });
}


/*
projects.display = function() {
    this.projects.some(function(project, index) {
        $("#projects").append(HTMLprojectStart);
        var title = HTMLprojectTitle.replace("%data%",project.title);
        // Only add date if it exists
        var dates = formatDate(project.dates) ? HTMLworkDates.replace("%data%",formatDate(project.dates)) : "";
        // Using the short description for projects
        var description = HTMLprojectDescription.replace("%data%",project.description.short);
        var images = [];
        project.images.some(function(url, index) {
            images.push(HTMLprojectImage.replace(
                "%data%",
                imgDir + "/" + project.imgDir + "/" + url
                ));
            srcSet(imgDir + "/" + project.imgDir + "/" + url);
            return index + 1 >= maxProjectImgs;
        });
        $(".project-entry:last").append(title + dates + description + images.join(""));
        // When the number of projects that have been appended is equal to the maxProjects set in config.js,
        // the this.projects.some() method will stop
        return index + 1 >= maxProjects;
    });
}
*/

// Initialize data importing
bio.display();
education.display();
work.display();

// All interaction scripting
$(document).ready(function() {
    // Accordions
    $(".accordion-header").click(handleAccordionClick(this));
});
