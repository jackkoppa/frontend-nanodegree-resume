/*
Functions for scripting interaction
*/

function handleAccordionClick(e) {
	var $accordion = $(e).parent();
	$accordion.toggleClass("open");
}