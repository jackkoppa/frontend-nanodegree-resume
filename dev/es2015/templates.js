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
template.accordionHeader = '<p class="accordion-header" onclick="handleAccordionClick(this)">%title% <i class="icon-plus"></i><i class="icon-minus"></i></p>'

// set tpl equal to base object (local tpl vars are defined within each object in resumeBuilder.js)
var tpl = template;