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
        output += template.divEnd;
        if (school.details) {
            output += tpl.details.replace("%details%", function() {
                var detailList = "";
                school.details.forEach(function(detail) {
                    detailList += tpl.detail.replace("%detail%",detail);
                });
                return detailList;
            });
        }        
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
        output += job.url ? tpl.linkStart.replace("%url%",job.url) : "";
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
        output += tpl.title.replace("%title%",job.title);
        output += tpl.employer.replace("%employer%",job.employer);
        output += tpl.location.replace("%location%",job.location);
        output += job.dates ? tpl.dates.replace("%dates%",formatDate(job.dates)) : "";
        output += template.divEnd;
        output += tpl.description.replace("%description%",job.description);
        output += job.url ? tpl.linkEnd : "";
        if (job.urls.companySite && job.urls.projectSite) {
            output += template.fullDiv.replace("%class%","spacer box-xs-3")
            output += btnReplace(job.urls.companySite.url, job.urls.companySite.siteType + " Site", "_blank", "flat", true, "box-xs-3");
            output += btnReplace(job.urls.projectSite.url, "Related " + job.urls.projectSite.siteType, "_blank", "flat", true, "box-xs-3");
            output += template.fullDiv.replace("%class%","spacer box-xs-3");
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


bio.display();
education.display();
work.display();
// projects.display();
