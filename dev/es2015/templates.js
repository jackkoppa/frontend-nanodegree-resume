/*
Simple template variables, stored withing template object
*/

var template = {};

template.bio = {
    // Header templates
    name: '<h1 class="element">%name%</h1>',
    role: '<h2 class="role element">%role%</h2>',
    welcomeMsg: '<h4 class="element">%welcomeMsg%</h4>',
    summaryMsg: '<p class="element">%summaryMsg%</p>',

    // Contacts templates
    contacts: '<ul id="top-contacts" class="element"></ul>',
    contact: '<li><a href="%contactLink%" target="%target%"><i class="icon icon-%contact%"></i><span class="%class%">%contactDisplay%</span></a></li>',

    // Skills templates
    skill: '<span>%skill%</span>',
    skillIcon: '<i class="icon icon-%skillSmall%"></i>'
}
template.bio.skillLi = '<li class="skill-item">' + template.bio.skillIcon + template.bio.skill + '</li>';

// Education templates
template.education = {
    elementStart: '<div class="education %class% element">',
    linkStart: '<a href="%url%" target="_blank">',
    school: '<h4>%school%</h4>',
    location: '<span class="location">%location%</span>',
    degree: '<span class="major">%degree%%major%</span>',
    minor: '<span class="minor">Minor, %minor%</span>',
    dates: '<span class="dates">%dates%</span>',
    details: '<ul class="details">%details%</ul>',
    detail: '<li class="detail">%detail%</li>',
    linkEnd: '</a>',
    elementEnd: '</div>'
}

// Work templates
template.work = {
    elementStart: '<div class="job element">',
    linkStart: '<a href="%url%" target="_blank">',
    title: '<h4>%title%</h4>',
    employer: '<h5>%employer%</h5>',
    location: '<span class="location">%location%</span>',
    dates: '<span class="dates">%dates%</span>',
    description: '<p class="description">%description%</p>',
    linkEnd: '</a>',
    elementEnd: '</div>'
}

// Project templates

// Footer templates

// General templates
//// Image templates
template.img = '<img srcset="%srcset%" sizes="%sizes%" src="%src%" alt="%alt%" >';
template.divImg = '<div class="image-wrapper %class%">' + template.img + '</div>';


// set tpl equal to base object (local tpl vars are defined within each object in resumeBuilder.js)
var tpl = template;