constants.tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});


constants.tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});

constants.gantt.margin(constants.margin);

constants.gantt.timeDomainMode("fixed");
changeTimeDomain(constants.timeDomainString);

ganttHelper.viewActualTime();

constants.gantt(constants.tasks);




function changeTimeDomain(timeDomainString, direction) {
    var endDate = !direction ? getEndDate() : ganttHelper.getLastDate(constants.lastDate);

    constants.timeDomainString = timeDomainString;
    ganttHelper.defineDomain(timeDomainString, endDate);
    
    constants.gantt.tickFormat(constants.format);
    constants.gantt.redraw(constants.tasks);
}



function getEndDate() {
    var lastEndDate = Date.now(),
        tasks = constants.tasks;
    if (tasks.length > 0) {
	   lastEndDate = tasks[tasks.length - 1].endDate;
    }

    return lastEndDate;
}



function addTask() {

    var lastEndDate = getEndDate();
    var taskStatusKeys = Object.keys(constants.taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
    var taskName = constants.taskNames[Math.floor(Math.random() * constants.taskNames.length)];

    constants.tasks.push({
    "task": "asdd",
	"startDate" : d3.time.hour.offset(lastEndDate, Math.ceil(1 * Math.random())),
	"endDate" : d3.time.hour.offset(lastEndDate, (Math.ceil(Math.random() * 3)) + 1),
	"taskName" : taskName,
	"status" : taskStatusName
    });

    constants.lastDate++;
    changeTimeDomain(constants.timeDomainString);
};



function removeTask() {
    if(constants.lastDate >= 0)
        constants.lastDate--;
    constants.tasks.pop();
    changeTimeDomain(constants.timeDomainString);
};



function zoom(direction) {
    ganttHelper.zoom(direction);
    changeTimeDomain(constants.timeDomainString, direction);
};



function viewActualTime() {
    ganttHelper.viewActualTime();
};