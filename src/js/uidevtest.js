$(function() {
	
	//Load list on page load
	$.getJSON( "../js/uidevtest-data.js", function( data ) {		
	    $.Mustache.load('list.html')
    	.done(function () {
			//Set variable for last item in list
        	$('#page').empty().mustache('list', data);
        });
	});   
   

});