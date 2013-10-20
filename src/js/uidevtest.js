$(function() {
		
	//set up namespace
    var _cmg = {};
	_cmg.properties = {};
	_cmg.stories = {};
	_cmg.stories.story = [];
	
	//Format Date		
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
	
	// Get params from the url
	_cmg.getUrlVars = function()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href
	                     .indexOf('?') + 1).split('&');

	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }

	    return vars;
	}
	
	// handle param location
	_cmg.handleLocation= function(data)
	{
		
		var storyLocation = '';
		//Loop over stories and check if the story id matches whats in query param
		for(var i=0, j=_cmg.stories.story.length;i<j; i++){
			if(_cmg.stories.story[i].id == data['story']){
				storyLocation = i;
			};
		} 
		//If Story Parameter exsits
		if( storyLocation || storyLocation === 0 ){		
			console.log(_cmg.stories.story[storyLocation]);
			_cmg.showStoryView( _cmg.stories.story[storyLocation] );
		//No param load default list view	
		}else{
			_cmg.showListView();
		}
	}
		
	//Check url for params
	_cmg.properties.params = _cmg.getUrlVars();
	

	
	//Load List View
	_cmg.showListView = function(){	
		console.log(_cmg);	
			//Render the summaries on the page.
        	$('#page').empty().mustache('list', _cmg.stories);		
	}
	
	//Load Story View
	_cmg.showStoryView = function(story){		
			//Render the summaries on the page.
        	$('#page').empty().mustache('story', story);
			
			//Enable columns for content
			$('#page #content').columnize({ columns: 2 });

	}
	
	
	///// Kick things off ////
	//Get and Set Story Data
	$.getJSON( "../js/uidevtest-data.js", function( data ) {		
		//Set variable for last item in list
		for(var i=0, j=data.objects.length;i<j; i++){
			data.objects[i].pub_date = _cmg.formatDate( data.objects[i].pub_date );
			data.objects[i].updated = _cmg.formatDate( data.objects[i].updated );
			var k = i+1;
			var storyNum = k < 10 ? "0" + k : k;
			_cmg.stories.story[i] = data.objects[i];
			_cmg.stories.story[i].id = 'sto' +  storyNum;			
		}
		
		//Load Templates
		$.Mustache.addFromDom();
		
		//Handle location
		_cmg.handleLocation( _cmg.properties.params ); 				
	});
	

		


});