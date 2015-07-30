var ganttHelper = {
	
	viewActualTime : function viewActualTime () {
	    var now = new Date(),
	        actualTime = true;

	    ganttHelper.defineDomain(constants.timeDomainString, now, actualTime);
	    constants.gantt.redraw();
	},


	
	addMinutes : function addMinutes(actualTime, date, addMinutes) {
	    if(actualTime)
	        date.setMinutes(date.getMinutes() + addMinutes);
	},



	defineDomain : function defineDomain(timeDomainString, date, actualTime) {
	    var range;
	    switch (timeDomainString) {

	        case "1hr":
	            constants.format = "%e %b %H:%M:%S";
	            range = 1;
	            addMinutes = 25;
	            ganttHelper.addMinutes(actualTime, date, addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case "3hr":
	            constants.format = "%e %b %H:%M";
	            range = 3;
	            addMinutes = 75;
	            ganttHelper.addMinutes(actualTime, date, addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case "6hr":
	            constants.format = "%e %b %H:%M";
	            range = 6;
	            addMinutes = 150;
	            ganttHelper.addMinutes(actualTime, date, addMinutes);
	            constants.gantt.timeDomain([ d3.time.hour.offset(date, -range), date ], constants.tasks);
	            break;

	        case "1day":
	            constants.format = "%e %b %H:%M";
	            range = 1;
	            addMinutes = 600;
	            ganttHelper.addMinutes(actualTime, date, addMinutes);
	            constants.gantt.timeDomain([ d3.time.day.offset(date, -range), date ], constants.tasks);
	            break;

	        case "1week":
	            constants.format = "%e %b %H:%M";
	            range = 7;
	            addMinutes = 4200;
	            ganttHelper.addMinutes(actualTime, date, addMinutes);
	            constants.gantt.timeDomain([ d3.time.day.offset(date, -range), date ], constants.tasks);
	            break;
	    
	        default:
	            constants.format = "%H:%M"
	    }
	},



	zoom : function zoom(direction) {
	    if(direction === 'left' && constants.lastDate > 0)
	        constants.lastDate--;
	    else if(direction === 'right' && constants.tasks.length -1 > constants.lastDate)
	        constants.lastDate++;
	},



	getLastDate : function getLastDate(i) {
	    var lastDate = Date.now();
	    if (constants.tasks.length > 0) {
	        lastDate = constants.tasks[i].endDate;
	    }

	    return lastDate;
	}
};