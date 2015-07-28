var tasks = [
    {"task": "task", "textVisible":"visible", "startDate":new Date("Sun Jul 28 00:29:48 EST 2015"),"endDate":new Date("Sun Jul 28 01:44:50 EST 2015"),"taskName":"Tail#1 Flight","status":"SUCCEEDED"},
];


var taskStatus = {
    "SUCCEEDED" : "bar height-flight",
    "FAILED" : "bar-failed height-flight",
    "RUNNING" : "bar-running height-flight",
    "KILLED" : "bar-killed height-flight"
};

var margin = {
    top : 20,
    right : 40,
    bottom : 20,
    left : 80
};

var taskNames = [ "Tail#1 Flight", "Tail#2 Flight", "Tail#3 Flight", "Tail#4 Flight", "Tail#5 Flight" ],
    maxDate = tasks.length > 0 ? tasks[tasks.length - 1].endDate : new Date(),
    minDate = tasks.length > 0 ? tasks[0].startDate : new Date(),
    //index in the array of tasks where the "zoom" is positioned
    lastDate = tasks.length - 1,
    addMinutes = 25,
    scale = "day";
    range = 1;
    format = "%H:%M",
    timeDomainString = "1day",
    gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);


tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});


tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});

gantt.margin(margin);

gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomainString);

viewActualTime(scale, addMinutes, range);

gantt(tasks);



function viewActualTime (scale, addMinutes, range) {
    var now = new Date();

    now.setMinutes(now.getMinutes() + addMinutes);
    //params in array should be dynamic: d3.time.scale.offset...
    gantt.timeDomain([ d3.time.day.offset(now, -range), now ]);
    gantt.hideText( [now, now], tasks);
};



function changeTimeDomain(timeDomainString, direction) {
    var endDate = !direction ? getEndDate() : getLastDate(lastDate);

    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {

        case "1hr":
        	format = "%e %b %H:%M:%S";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -1), endDate ], tasks);
            scale = "hour";
            range = 1;
            addMinutes = 25;
        	break;

        case "3hr":
        	format = "%e %b %H:%M";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -3), endDate ], tasks);
            scale = "hour";
            range = 3;
            addMinutes = 75;
        	break;

        case "6hr":
        	format = "%e %b %H:%M";
        	gantt.timeDomain([ d3.time.hour.offset(endDate, -6), endDate ], tasks);
            scale = "hour";
            range = 6;
            addMinutes = 150;
        	break;

        case "1day":
        	format = "%e %b %H:%M";
        	gantt.timeDomain([ d3.time.day.offset(endDate, -1), endDate ], tasks);
            scale = "day";
            range = 1;
            addMinutes = 600;
        	break;

        case "1week":
        	format = "%e %b %H:%M";
        	gantt.timeDomain([ d3.time.day.offset(endDate, -7), endDate ], tasks);
            scale = "day";
            range = 7;
            addMinutes = 4200;
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
};


function removeTask() {
    if(lastDate >= 0)
        lastDate--;
    tasks.pop();
    changeTimeDomain(timeDomainString);
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
