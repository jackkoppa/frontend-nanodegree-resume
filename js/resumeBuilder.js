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

work.display = function() {
	work.jobs.forEach(function importWork(job) {
		$("#workExperience").append(HTMLworkStart);
		var employer = HTMLworkEmployer.replace("%data%",job.employer);
		var title = HTMLworkTitle.replace("%data%",job.title);
		// Other implementations may use dateObj in the future
		var dates = job.dateString ? HTMLworkDates.replace("%data%",job.dateString) : "";
		var location = HTMLworkLocation.replace("%data%",job.location);
		var description = HTMLworkDescription.replace("%data%",job.description);
		$(".work-entry:last").append(employer + title + dates + location + description);
	});
}

projects.display = function() {
	this.projects.forEach(function(project) {
		$("#projects").append(HTMLprojectStart);
		var title = HTMLprojectTitle.replace("%data%",project.title);
		var dates = HTMLprojectDates.replace("%data%",project.dates);
		var description = HTMLprojectDescription.replace("%data%",project.description);
		var imagesURL = [];
		project.images.forEach(function(url) {
			imagesURL.push(HTMLprojectImage.replace("%data%",url));
		});
		$(".project-entry:last").append(title + dates + description + imagesURL.join(""));
	});
}

work.display();
projects.display();

$("#header").append(HTMLheaderName.replace("%data%",bio.name));
$("#header").append(HTMLheaderRole.replace("%data%",bio.role));


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