var jsonResume = (function() {
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

var bio = jsonResume.bio;
var education = jsonResume.education;
var work = jsonResume.work;
var projects = jsonResume.projects;

// format date from date objects; takes 2 arguments
function formatDate(rawDate,shortForm = true) {
    if (rawDate) {
        var monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var msg = "";
        var monthArray = shortForm ? monthsShort : monthsLong;
        msg = monthsArray[rawDate.startMonth + 1] + " " + rawDate.startYear;
        if (rawDate.startMonth !== rawDate.endMonth && rawDate.startYear !== rawDate.endYear) {
            msg += rawDate.endMonth ? " - " + monthsArray[rawDate.endMonth] + " " + rawDate.endYear;
        }
        return msg;
    } else {
        return false;
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