/*
A few changeable, essential project setup variables (only affect client-side functions, not Grunt setup)
*/
"use strict";

// Maximum number of items to display
// Jobs
var maxJobs = 4;
// Project
var maxProjects = 4;
var maxProjectImgs = 4;

// Base image directory
var imgDir = "responsive_images/";

var breakpoints = {
    xs: null,
    sm: 480,
    md: 640,
    lg: 900,
    xl: 1200
}