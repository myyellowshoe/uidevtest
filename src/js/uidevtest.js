$(function() {
	
	$.getJSON( "js/uidevtest-data.json", function( data ) {		
	    // Clear #someList and then render all the viewModels using the list-template.
	    $('#page').empty().mustache('html/list.html', data.objects);
	}


});