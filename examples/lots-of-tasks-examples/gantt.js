
var taskStatus = {
	"EOJ" : "bar",
	"END" : "bar-failed"
};

var taskTipCompute = function(d) {
	var format = d3.time.format("%H:%M:%S");
	var durationTotalSeconds = (d.endDate - d.startDate) / 1000;
	var durationSeconds = durationTotalSeconds % 60;
	var durationMinutesTotal = Math.floor(durationTotalSeconds / 60);
	var durationMinutes = durationMinutesTotal % 60;
	var durationHeures = Math.floor(durationMinutesTotal / 60);
	var tipContent = d.taskName + " - ";
	if (durationHeures > 0) {
		tipContent += durationHeures + "h ";
	}
	if (durationMinutes > 0) {
		tipContent += durationMinutes + "min ";
	}
	tipContent += durationSeconds + "s" + "<br>";
	if (d.data && d.data.report) {
		tipContent += d.data.report;
	}
	switch (d.status) {
		case "END":
			tipContent += "&nbsp;&nbsp;<span class=\"end\">END</span>";
			break;
		case "EOJ":
			tipContent += "&nbsp;&nbsp;<span class=\"eoj\">EOJ</span>";
			break;
		default: 
			tipContent += "&nbsp;&nbsp;état inconnu.";
			break;
	}
	tipContent += "<br>";
	tipContent += format(d.startDate) + " > " + format(d.endDate) + "<br>";
	return tipContent;
}

var clickFunction = function(d) {
	if (d.data && d.data.link) {
		location.href = d.data.link;
	}
	return;
}

function getHeightForGraph(gantt) {
	return document.body.clientHeight - parseInt(d3.select("h1").style('height')) - gantt.margin().top - gantt.margin().bottom - 30;
}

function getWidthForGraph(gantt) {
	return document.body.clientWidth - gantt.margin().right - gantt.margin().left - 5;
}

//First display of the gantt.
var format = "%H:%M";
var gantt = d3.gantt().taskStatus(taskStatus).tickFormat(format);
gantt.tipFunction(taskTipCompute).clickFunction(clickFunction)
gantt.margin({top : 20, right : 40, bottom : 20, left : 100});
gantt.height(getHeightForGraph(gantt));//width auto.
gantt.rectRound(1);
gantt.horizontalLines(true);
gantt.activateZooming(true);
gantt.timeDomainMode("fit"); //automatic scale.
gantt(tasks);

//Auto resize
window.onresize = function(){
   gantt.height(getHeightForGraph(gantt));
   gantt.width(getWidthForGraph(gantt));
   filterTasks();//filter tasks and redraw.
}

//Filter functions

function filterTasksByProperties(name, eoj, end) {
	//console.log("Filtrage sur : name= " + name + ", eoj= " + eoj + ", end= " + end);
	var tasksFiltered = tasks; 
	if (!eoj) {
		tasksFiltered = tasksFiltered.filter(function(element) {
			return (element.status != "EOJ");
		});
	}
	if (!end) {
		tasksFiltered = tasksFiltered.filter(function(element) {
			return (element.status != "END");
		});
	}
	if (name != "") {
		tasksFiltered = tasksFiltered.filter(function(element) {
			return (element.taskName.indexOf(name) == 0); //starts with en JS.
		});
	}
	return tasksFiltered;
}


function filterTasks() {
	var filterContent=d3.select("#filterName").property("value").toUpperCase();
	d3.select("#filterName").property("value", filterContent);
	var filterEOJ = d3.select("#cbeoj").property("checked");
	var filterEND = d3.select("#cbend").property("checked");
	
	var tasksFiltered = filterTasksByProperties(filterContent, filterEOJ, filterEND);
	gantt.redraw(tasksFiltered);
}

function razFilter() {
	d3.select("#filterName").property("value", "");
	d3.select("#cbeoj").property("checked", true);
	d3.select("#cbend").property("checked", true);
	filterTasks();//filter tasks and redraw.
}

