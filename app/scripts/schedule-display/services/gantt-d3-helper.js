'use strict';

angular.module('ScheduleDisplay').service('ganttHelper', function() {

  var service = {};

   service.viewActualTime = function() {
   		var now = new Date(),
	        actualTime = true;

	    service.defineDomain(constants.timeDomainString, now, actualTime);
	    constants.gantt.redraw();
   };

   service.addMinutes = function(actualTime, date, addMinutes) {
	    if(actualTime){
	        date.setMinutes(date.getMinutes() + addMinutes);
	    }
	};

	service.defineDomain = function(timeDomainString, date, actualTime) {
	    var range;
	    switch (timeDomainString) {

	        case '1hr':
	            constants.format = '%e %b %H:%M:%S';
	            range = 1;
	            constants.addMinutes = 25;
	            service.addMinutes(actualTime, date, constants.addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case '3hr':
	            constants.format = '%e %b %H:%M';
	            range = 3;
	            constants.addMinutes = 75;
	            service.addMinutes(actualTime, date, constants.addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case '6hr':
	            constants.format = '%e %b %H:%M';
	            range = 6;
	            constants.addMinutes = 150;
	            service.addMinutes(actualTime, date, constants.addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case '1day':
	            constants.format = '%e %b %H:%M';
	            range = 1;
	            constants.addMinutes = 600;
	            service.addMinutes(actualTime, date, constants.addMinutes);
	            constants.gantt.timeDomain([ d3.time.day.offset(date, -range), date ], constants.tasks);
	            break;

	        case '1week':
	            constants.format = '%e %b %H:%M';
	            range = 7;
	            constants.addMinutes = 4200;
	            service.addMinutes(actualTime, date, constants.addMinutes);
	            constants.gantt.timeDomain([ d3.time.day.offset(date, -range), date ], constants.tasks);
	            break;
	    
	        default:
	            constants.format = '%H:%M';
	    }
	};


	service.zoom = function(direction) {
	    if(direction === 'left' && constants.lastDate > 0){
	        constants.lastDate--;
	    }
	    else if(direction === 'right' && constants.tasks.length -1 > constants.lastDate){
	        constants.lastDate++;
	    }
	};

	service.getLastDate= function(i) {
	    var lastDate = Date.now();
	    if (constants.tasks.length > 0) {
	        lastDate = constants.tasks[i].endDate;
	    }

	    return lastDate;
	};

	service.verifyDateFormat= function(flights) {
		var length = flights.length;

		for(var i = 0; i < length; i++) {
			flights[i].startDate = new Date(flights[i].startDate);
			flights[i].endDate = new Date(flights[i].endDate);
		}

		return flights;
	};

	service.getEndDate = function(){
		var lastEndDate = Date.now(),
	        tasks = constants.tasks;
	    if (tasks.length > 0) {
		   lastEndDate = tasks[tasks.length - 1].endDate;
	    }

	    return lastEndDate;
	};
  
  return service;
});