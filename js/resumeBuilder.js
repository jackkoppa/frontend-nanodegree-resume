var work = {
	"jobs" : [{
		"employer": "Self-Employed",
		"title": "Web Developer",
		"location": "Milwaukee, WI, US",
		"dates": "Feb 2017 - present",
		"description": "description"
	},
	{
		"employer": "Self-Employed",
		"title": "Web Developer",
		"location": "Milwaukee, WI, US",
		"dates": "Feb 2017 - present",
		"description": "description"
	}]
}

var projects = {
	"projects" : [{
		"title": "Chanje",
		"dates": "Jan 2016 - Feb 2017",
		"description": "test",
		"images" : [
			"img/chanje1.jpg",
			"img/chanje2.jpg"
		]
	},{
		"title": "Chanje",
		"dates": "Jan 2016 - Feb 2017",
		"description": "test",
		"images" : [
			"img/chanje1.jpg",
			"img/chanje2.jpg"
		]
	}]
}

var bio = {
	"name": "Jack Koppa",
	"role": "Web Developer | Cleantech Advocate",
	"welcomeMessage": "Hi - I make things with a purpose.",
	"biopic": "img/jack_koppa_profile.jpg",
	"contacts": {
		"mobile": "+1 650-761-1414",
		"email": "hello@jackkoppa.com",
		"github": "jackkoppa",
		"twitter": "jackpkoppa",
		"linkedin": "jackkoppa",
		"location": "Milwaukee, WI, US"
	},
	"skills": [
		"HTML",
		"CSS",
		"JavaScript",
		"WordPress",
		"PHP",
		"MySQL",
		"SCSS",
		"Grunt",
		"Backbone.js",
		"React.js"
	]
}

var education = {
	"schools" : [{
		"name": "University of Southern California",
		"city": "Los Angeles, CA, US",
		"degree": "BA",
		"major": ["Environmental Studies","Chinese"],
		"minor": ["Digital Studies"],
		"dates": "Aug 2012 - May 2016",
		"url": "https://dornsife.usc.edu/"
	},
	{
		"name": "Capital Normal University",
		"city": "Beijing, China",
		"degree": "Study Abroad",
		"major": ["Chinese Language"],
		"dates": "May 2014 - July 2014",
		"url": "https://dornsife.usc.edu/ealc/beijing-program/"
	}],
	"onlineCourses" : [{
		"title": "Front-End Web Developer Nanodegree",
		"school": "Udacity",
		"dates": "Jan 2016 - present",
		"url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
	}]
}

$("#header").append(HTMLheaderName.replace("%data%",bio.name));
$("#header").append(HTMLheaderRole.replace("%data%",bio.role));


if (bio.skills.length > 0) {
	console.log("skills exist");
	$("#header").append(HTMLskillsStart);
	bio.skills.forEach(function(skill) {
		$("#skills").append(HTMLskills.replace("%data%",skill));
	});
}

work.jobs.forEach(function(job) {
	$("#workExperience").append(HTMLworkStart);
	var employer = HTMLworkEmployer.replace("%data%",job.employer);
	var title = HTMLworkTitle.replace("%data%",job.title);
	$(".work-entry:last").append(employer + title);
});