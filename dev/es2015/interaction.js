/*
Functions for scripting interaction
*/

function handleAccordionClick(e) {
	var $accordion = $(e).parent();
	var contentHeight = $accordion.children(".accordion-content").height();
	console.log(contentHeight);
	if($accordion.hasClass("open")) {
		$accordion.css("max-height","");		
	} else {
		$accordion.css("max-height",$accordion.height() + contentHeight);
	}
	$accordion.toggleClass("open");
}