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

bio.displayContacts = function() {
    for (var contact in this.contacts) {
        if (this.contacts.hasOwnProperty(contact)) {
            $("#footerContacts").append(HTMLcontactGeneric.replace("%contact%",contact).replace("%data%",contacts[contact]));
        }
    }
}

work.display = function() {
	work.jobs.forEach(function importWork(job) {
		$("#workExperience").append(HTMLworkStart);
		var employer = HTMLworkEmployer.replace("%data%",job.employer);
		var title = HTMLworkTitle.replace("%data%",job.title);
		var dates = formatDate(job.date) ? HTMLworkDates.replace("%data%",formatDate(job.date)) : "";
		var location = HTMLworkLocation.replace("%data%",job.location);
		var description = HTMLworkDescription.replace("%data%",job.description);
		$(".work-entry:last").append(employer + title + dates + location + description);
	});
}

projects.display = function() {
	this.projects.forEach(function(project) {
		$("#projects").append(HTMLprojectStart);
		var title = HTMLprojectTitle.replace("%data%",project.title);
        var dates = formatDate(project.date) ? HTMLworkDates.replace("%data%",formatDate(project.date)) : "";
        // Using the short description for projects
		var description = HTMLprojectDescription.replace("%data%",project.description.short);
		var images = [];
		project.images.forEach(function(url) {
			images.push(HTMLprojectImage.replace("%data%",url));
		});
		$(".project-entry:last").append(title + dates + description + images.join(""));
	});
}


work.display();
projects.display();


if (bio.skills.length > 0) {
	console.log("skills exist");
	$("#header").append(HTMLskillsStart);
	bio.skills.forEach(function(skill) {
		$("#skills").append(HTMLskills.replace("%data%",skill));
	});
}


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