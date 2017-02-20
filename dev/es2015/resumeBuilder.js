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

var imgDir = responsiveImgs ? 'resume-data/img_responsive' : 'resume-data/img';

// format date from date objects; takes 2 arguments
function formatDate(rawDate,shortForm = true) {
    if (rawDate) {
        var monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var msg = "";
        var monthsArray = shortForm ? monthsShort : monthsLong;
        msg = monthsArray[rawDate.startMonth + 1] + " " + rawDate.startYear;
        if (rawDate.startMonth !== rawDate.endMonth && rawDate.startYear !== rawDate.endYear) {
            msg += rawDate.endMonth ? " - " + monthsArray[rawDate.endMonth] + " " + rawDate.endYear : "";
        }
        return msg;
    } else {
        return false;
    }
}

bio.display = function() {
    $("#header").prepend(HTMLheaderRole.replace("%data%",this.role));
    $("#header").prepend(HTMLheaderName.replace("%data%",this.name));

    for (var contact in this.contacts) {
        if (this.contacts.hasOwnProperty(contact)) {
            // using bio's appendContacts method, passing in desired element
            // & the prop that should be used (current `contact`)
            this.appendContacts("#topContacts",contact);
            this.appendContacts("#footerContacts",contact);
        }
    }

    $("#header").append(HTMLbioPic.replace("%data%",this.biopic));
    $("#header").append(HTMLwelcomeMsg.replace("%data%",this.welcomeMessage));
    if (this.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        bio.skills.forEach(function(skill) {
            $("#skills").append(HTMLskills.replace("%data%",skill));
        });
    }
}

bio.appendContacts = function(jqueryString,prop) {
    $(jqueryString).append(HTMLcontactGeneric.replace("%contact%",prop).replace("%data%",this.contacts[prop]));
}

work.display = function() {
    this.jobs.some(function importWork(job, index) {
        $("#workExperience").append(HTMLworkStart);
        var employer = HTMLworkEmployer.replace("%data%",job.employer);
        var title = HTMLworkTitle.replace("%data%",job.title);
        // only add date if it exists
        var dates = formatDate(job.dates) ? HTMLworkDates.replace("%data%",formatDate(job.dates)) : "";
        var location = HTMLworkLocation.replace("%data%",job.location);
        var description = HTMLworkDescription.replace("%data%",job.description);
        $(".work-entry:last").append(employer + title + dates + location + description);
        // When the number of jobs that have been appended is equal to the maxJobs set in config.js,
        // the this.jobs.some() method will stop
        return index + 1 >= maxJobs;
    });
}

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
            images.push(HTMLprojectImage.replace("%data%",imgDir + "/" + project.imgDir + "/" + url));
            return index + 1 >= maxProjectImgs;
        });
        $(".project-entry:last").append(title + dates + description + images.join(""));
        // When the number of projects that have been appended is equal to the maxProjects set in config.js,
        // the this.projects.some() method will stop
        return index + 1 >= maxProjects;
    });
}


bio.display();
work.display();
projects.display();


$(document).click(function(loc) {
    logClicks(loc.pageX, loc.pageY);
})

$("#main").append(internationalizeButton);

function inName(name) {
    var nameArray = name.split(" ");
    nameArray[1] = nameArray[1].toUpperCase();
    nameArray[0] = nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1,nameArray[0].length).toLowerCase();
    return nameArray.join(" ");
}