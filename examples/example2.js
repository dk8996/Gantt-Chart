example();
function example() {

var tasks = [
{"startDate":new Date("Sun Dec 09 01:36:45 EST 2012"),"endDate":new Date("Sun Dec 09 02:36:45 EST 2012"),"taskName":"E Job","status":"RUNNING"}];

var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = [ "D Job", "P Job", "E Job", "A Job", "N Job" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%H:%M";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
//gantt.timeDomain([new Date("Sun Dec 09 04:54:19 EST 2012"),new Date("Sun Jan 09 04:54:19 EST 2013")]);
//gantt.timeDomainMode("fixed");
gantt(tasks);


example.addTask = function() {
    
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
	lastEndDate = tasks[tasks.length - 1].endDate;
    }
    
    var taskStatusKeys = Object.keys(taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random()*taskStatusKeys.length)];
    var taskName = taskNames[Math.floor(Math.random()*taskNames.length)];
    
    tasks.push({"startDate":d3.time.hour.offset(lastEndDate,Math.ceil(1*Math.random())),"endDate":d3.time.hour.offset(lastEndDate,(Math.ceil(Math.random()*3))+1),"taskName":taskName,"status":taskStatusName});
    gantt.redraw(tasks);
};

example.removeTask = function() {
    tasks.pop();
    gantt.redraw(tasks);
};

};
