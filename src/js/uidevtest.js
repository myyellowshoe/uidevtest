$(function() {
	
	//Load list on page load
	$.getJSON( "../js/uidevtest-data.js", function( data ) {		
	    $.Mustache.load('list.html')
    	.done(function () {
			//Set variable for last item in list
			for(var i=0, j=data.objects.length;i<j; i++){
				data.objects[i].pub_date = _cmg.formatDate( data.objects[i].pub_date );
				data.objects[i].updated = _cmg.formatDate( data.objects[i].updated );
			}
        	$('#page').empty().mustache('list', data);
        });
	});   
	

	
	//set up namespace
    var _cmg = {};
	
	_cmg.formatDate = function(date) {
	    var d = new Date(date);
		console.log(date);
		console.log(d);
	    var hh = d.getHours();
	    var m = d.getMinutes();
	    var s = d.getSeconds();
	    var dd = "a.m.";
	    var h = hh;
	    if (h >= 12) {
	        h = hh-12;
	        dd = "p.m.";
	    }
	    if (h == 0) {
	        h = 12;
	    }
		
		//Minutes
		m = m<10?"0"+m:m;
		
		//Day
		var daysOfWeek=new Array(7);
		daysOfWeek[0]="Sunday";
		daysOfWeek[1]="Monday";
		daysOfWeek[2]="Tuesday";
		daysOfWeek[3]="Wednesday";
		daysOfWeek[4]="Thursday";
		daysOfWeek[5]="Friday";
		daysOfWeek[6]="Saturday";
				
		day = daysOfWeek[d.getDay()];
		
		//Month
		var monthsOfYear=new Array(12);
		monthsOfYear[0]="Jan";
		monthsOfYear[1]="Feb";
		monthsOfYear[2]="Mar";
		monthsOfYear[3]="Apr";
		monthsOfYear[4]="May";
		monthsOfYear[5]="Jun";
		monthsOfYear[6]="Jul";
		monthsOfYear[7]="Aug";
		monthsOfYear[8]="Sep";
		monthsOfYear[9]="Oct";
		monthsOfYear[10]="Nov";
		monthsOfYear[11]="Dec";
		var month = monthsOfYear[d.getMonth()];
		
	    return h+":"+m+" "+dd+" "+day+", "+ month +". "+d.getDay()+", "+d.getFullYear();
	}
	


});