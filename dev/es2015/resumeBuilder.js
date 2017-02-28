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
    var topContacts = ["twitter","linkedin","github","location","email"];

    function prepareContact(contact,contacts) {
        var contactName = "";
        var contactLink = contacts[contact];
        var target = "_blank";
        switch (contact) {
            case "mobile" :
                contactLink = "tel:+" + contactLink.replace(/([\D])/g,"");
                break;
            case "email" : 
                contactLink = "mailto:" + contactLink;
                break;
            case "github" :
                contactLink = "https://github.com/" + contactLink;
                break;
            case "twitter" :
                contactLink = "https://twitter.com/" + contactLink;
                break;
            case "linkedin" :
                contactLink = "https://linkedin.com/in/" + contactLink;
                break;
            case "location" :
                contactLink = "#map-div";
                target = "self";
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
                .replace("%target%",target);
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
        "blur-cover box-xs-7 box-md-6"));
    $("#logo-wrapper").append(imgReplace(
        this.logo,
        "",
        this.name + " Logo",
        false));
    $("#intro").append(tpl.name.replace("%name%",this.name));
    $("#intro").append(tpl.role.replace("%role%",this.role));
    $("#intro").append(tpl.contacts);
    topContacts.forEach(function(contact) {
        $("#top-contacts").append(prepareContact(contact,bio.contacts));
    });
    
    $("#summary").append(tpl.welcomeMsg.replace("%welcomeMsg%",this.welcomeMessage));
    $("#summary").append(tpl.summaryMsg.replace("%summaryMsg%",this.personalSummary));
    // end #header

    // start #main
    this.skills.forEach(function(skill,index,skills) {
        $("#skills-list").append(tpl.skillLi
            .replace("%skill%",skill)
            .replace("%skillSmall%",skill.toLowerCase().replace(/\s|\.\w+/g,""))
            );
    });
}

education.display = function() {
    var tpl = template.education;
    function prepareSchool(school) {
        var physical = school.location ? true : false;
        var name = school.name ? school.name : (school.school ? school.school : "");
        var output = "";
        output += physical ? tpl.elementStart.replace("%class%","physical-school") : tpl.elementStart.replace("%class%","online-program");
        output += school.url ? tpl.linkStart.replace("%url%",school.url) : "";
        if(school.logo) {
            output += imgReplace(
                school.imgDir + school.logo,
                "",
                name + " Logo",
                false);
        }
        output += tpl.school.replace("%school%",name);
        output += physical ? tpl.location.replace("%location%",school.location) : "";
        if (school.degree && Array.isArray(school.major)) {
            school.major.forEach(function(major) {
                output += tpl.degree
                    .replace("%degree%",school.degree)
                    .replace("%major%",major);
            });
        } else if (school.title) {
            output += tpl.degree.replace("%degree%%major%",school.title);
        }
        output += school.minor ? tpl.minor.replace("%minor%",school.minor) : "";
        output += school.dates ? tpl.dates.replace("%dates%",formatDate(school.dates)) : "";
        if (school.details) {
            output += tpl.details.replace("%details%", school.details.forEach(function(detail) {
                return tpl.detail.replace("%detail%",detail);
            }));
        }
        output += school.url ? tpl.linkEnd : "";
        output += tpl.elementEnd;
        return output;
    }
    this.schools.forEach(function(school) {
        $("#education").append(prepareSchool(school));
    });
    this.onlineCourses.forEach(function(school) {
        $("#education").append(prepareSchool(school));
    });
}

work.display = function() {
    var tpl = template.work;
    function prepareJob(job) {
        var output = "";
        output += tpl.elementStart;
        output += job.url ? tpl.linkStart.replace("%url%",job.url) : "";
        if(job.logo) {
            output += imgReplace(
                job.imgDir + job.logo,
                "",
                job.employer + " Logo",
                false);
        }
        output += tpl.title.replace("%title%",job.title);
        output += tpl.employer.replace("%employer%",job.employer);
        output += tpl.location.replace("%location%",job.location);
        output += job.dates ? tpl.dates.replace("%dates%",formatDate(job.dates)) : "";
        output += tpl.description.replace("%description%",job.description);
        output += job.url ? tpl.linkEnd : "";
        output += tpl.elementEnd;
        return output;
    }
    this.jobs.forEach(function(job) {
        $("#work").append(prepareJob(job));
    });
}


/*
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
*/

/*
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
*/

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


bio.display();
education.display();
work.display();
// projects.display();
