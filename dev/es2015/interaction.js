/*
Functions for scripting interaction
*/

function handleAccordionClick(e) {
	var $accordion = $(e).parent();
	var height = $accordion.children(".accordion-content").height();
	console.log(height);
	$accordion.toggleClass("open");
}