/*
Simple template variables, stored withing template object
*/

var template = {};

// Header templates
template.name = '<h1 class="element">%data%</h1>';
template.role = '<h2 class="element">%data%</h2>';
template.welcomeMsg = '<h4 class="element">%data%</h4>';
template.summaryMsg = '<p class="element">%data%</p>';

// Skills templates
template.skill = '<span>%skill%</span>';
template.skillIcon = '<i class="icon icon-%skillSmall%"></i>';
template.skillLi = '<li class="skill-item">' + template.skillIcon + template.skill + '</li>';

// Education templates
template.eduSchool = '<h4>%school%</h4>';
template.eduLocation = '<span class="location">%location%</span>';
template.eduDegree = '<span class="major">%degree% %major%</span>';
template.eduMinor = '<span class="minor">Minor, %minor%</span>';
template.eduDates = '<span class="dates">%dates%</span>';
template.eduDetails = '<ul class="details"></ul>';
template.eduDetail = '<li class="detail">%detail%</li>';
template.eduElement = '<div class="education %class% element"><a href="%url%"></a></div>';

// Work templates

// Project templates

// Footer templates

// General templates
//// Image templates
template.img = '<img srcset="%srcset%" sizes="%sizes%" src="%src%" alt="%alt%" >';
template.divImg = '<div class="image-wrapper %class%">' + template.img + '</div>';