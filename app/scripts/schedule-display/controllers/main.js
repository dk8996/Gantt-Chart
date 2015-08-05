'use strict';

angular.module('ScheduleDisplay').controller('mainCtrl', function ($scope, FlightSrvApi,ganttHelper) {


FlightSrvApi.getFlights().
	then(function(data){
		constants.tasks=ganttHelper.verifyDateFormat(data.global.flights);

		constants.tasks.sort(function(a, b) {
		    return a.endDate - b.endDate;
		});


		constants.tasks.sort(function(a, b) {
		    return a.startDate - b.startDate;
		});

		constants.gantt.margin(constants.margin);

		constants.gantt.timeDomainMode("fixed");
		$scope.changeTimeDomain(constants.timeDomainString);

		ganttHelper.viewActualTime();

		constants.gantt(constants.tasks);

	});


$scope.changeTimeDomain = function(timeDomainString, direction) {
    var endDate = !direction ? ganttHelper.getEndDate() : ganttHelper.getLastDate(constants.lastDate);

    constants.timeDomainString = timeDomainString;
    ganttHelper.defineDomain(timeDomainString, endDate);
    
    constants.gantt.tickFormat(constants.format);
    constants.gantt.redraw(constants.tasks);
}


$scope.addTask = function() {

    var lastEndDate = ganttHelper.getEndDate();
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
    $scope.changeTimeDomain(constants.timeDomainString);
};



$scope.removeTask = function() {
    if(constants.lastDate >= 0)
        constants.lastDate--;
    constants.tasks.pop();
    $scope.changeTimeDomain(constants.timeDomainString);
};



$scope.zoom = function(direction) {
    ganttHelper.zoom(direction);
    $scope.changeTimeDomain(constants.timeDomainString, direction);
};



$scope.viewActualTime = function() {
    ganttHelper.viewActualTime();
};


});