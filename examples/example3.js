var tasks = [
{"task": "task", "textVisible":"visible", "startDate":new Date("Sun Dec 09 00:29:48 EST 2012"),"endDate":new Date("Sun Dec 09 01:44:50 EST 2012"),"taskName":"Tail#1 Flight","status":"SUCCEEDED"},
];


var taskStatus = {
    "SUCCEEDED" : "bar height-flight",
    "FAILED" : "bar-failed height-flight",
    "RUNNING" : "bar-running height-flight",
    "KILLED" : "bar-killed height-flight"
};

var taskNames = [ "Tail#1 Flight", "Tail#2 Flight", "Tail#3 Flight", "Tail#4 Flight", "Tail#5 Flight" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

//index in the array of tasks where the "zoom" is positioned
var lastDate = tasks.length - 1;

var format = "%H:%M";
var timeDomainString = "1day";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);

var margin = {
     top : 20,
     right : 40,
     bottom : 20,
     left : 80
};
gantt.margin(margin);

gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomainString);

gantt(tasks);

function changeTimeDomain(timeDomainString, direction) {
    //if zoom button is pressed then direction has value left or right and date from tasks array with index [lastDate] is returned
    //else the last date from the tasks is returned
    var endDate = !direction ? getEndDate() : getLastDate(lastDate);

    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {

        case "1hr":
        	format = "%H:%M:%S";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -1), endDate ], tasks);
        	break;

        case "3hr":
        	format = "%H:%M";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -3), endDate ], tasks);
        	break;

        case "6hr":
        	format = "%H:%M";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -6), endDate ], tasks);
        	break;

        case "1day":
        	format = "%H:%M";
        	gantt.timeDomain([ d3.time.day.offset(endDate, -1), endDate ], tasks);
        	break;

        case "1week":
        	format = "%a %H:%M";
        	gantt.timeDomain([ d3.time.day.offset(endDate, -7), endDate ], tasks);
        	break;
    
        default:
        	format = "%H:%M"

    }
    
    gantt.tickFormat(format);
    gantt.redraw(tasks);
}

function getEndDate() {
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
	   lastEndDate = tasks[tasks.length - 1].endDate;
    }

    return lastEndDate;
}


function addTask() {

    var lastEndDate = getEndDate();
    var taskStatusKeys = Object.keys(taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
    var taskName = taskNames[Math.floor(Math.random() * taskNames.length)];

    tasks.push({
    "task": "asdd",
	"startDate" : d3.time.hour.offset(lastEndDate, Math.ceil(1 * Math.random())),
	"endDate" : d3.time.hour.offset(lastEndDate, (Math.ceil(Math.random() * 3)) + 1),
	"taskName" : taskName,
	"status" : taskStatusName
    });

    lastDate++;
    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};


function removeTask() {
    tasks.pop();
    lastDate--;
    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};


//function called to move in timeline.. adds or substracts lastdate (index in tasks to be shown)
function zoom(direction) {
    if(direction === 'left' && lastDate > 0)
        lastDate--;
    else if(direction === 'right' && tasks.length -1 > lastDate)
        lastDate++;

    changeTimeDomain(timeDomainString, direction);
};


//get last date of the tasks array with a specific index
function getLastDate(i) {
    var lastDate = Date.now();
    if (tasks.length > 0) {
        lastDate = tasks[i].endDate;
    }

    return lastDate;
};
