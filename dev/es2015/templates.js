/*
Simple template variables, stored withing template object
*/

var template = {};

// Header templates
template.name = '<h1 class="element">%data%</h1>';
template.role = '<span class="element">%data%</span>';

// Contact templates

// Intro templates

// Skills templates

// Education templates

// Work templates

// Project templates

// Footer templates

// General templates
//// Image templates
template.img = '<img srcset="%srcset%" sizes="" src="%src%" alt="%alt%" >';
template.divImg = '<div class="image-wrapper %class%">' + template.img + '</div>';