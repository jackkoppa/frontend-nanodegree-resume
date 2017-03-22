/*
Functions for scripting interaction
*/

function handleAccordionClick(e) {
	var $accordion = e.parent(".accordion");
	$accordion.toggleClass("open");
}