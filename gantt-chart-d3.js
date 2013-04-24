/**
 * @author Dimitry Kudrayvtsev
 * @version 2.0
 */

d3.gantt = function() {
    
    var margin = {
	top : 20,
	right : 40,
	bottom : 20,
	left : 150
    };
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = "fit";// fixed or fit
    var taskTypes = [];
    var taskStatus = [];
    var height = document.body.clientHeight - margin.top - margin.bottom-5;
    var width = document.body.clientWidth - margin.right - margin.left-5;

    var tickFormat = '%H:%M';
    
    function gantt(tasks) {
	
	if(timeDomainMode === "fit"){
    	    tasks.sort(function(a, b) {
		return a.endDate - b.endDate;
	    });
	     timeDomainEnd = tasks[tasks.length - 1].endDate;
	    tasks.sort(function(a, b) {
		return a.startDate - b.startDate;
	    });
	     timeDomainStart = tasks[0].startDate;
	}
	
	var x = d3.time.scale()
	.domain([ timeDomainStart, timeDomainEnd ])
	.range([ 0, width])
	.clamp(true);
	
	var y = d3.scale.ordinal()
	.domain(taskTypes)
	.rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
	
	var xAxis = d3.svg.axis().scale(x)
	.orient('bottom')
	.ticks(d3.time.hours, 1)
	.tickFormat(d3.time.format(tickFormat))
	.tickSize(8)
	.tickPadding(8);

	   
	var yAxis = d3.svg.axis().scale(y)
	.orient("left").tickSize(0);	
	
	var svg = d3.select('body')
	.append('svg')
	.attr('class', 'chart')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	 var chart = svg.selectAll('.chart')
	 .data(tasks).enter()
	 .append('rect')
	 .attr("rx", 5)
         .attr("ry", 5)
	 .attr('class', function(d){ 
	     if(taskStatus[d.status] == null){ return 'bar';}
	     return taskStatus[d.status];
	     }) 
	 .attr("y", 0)
	 .attr("transform", function(d) { return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")"; })
	 .attr('height', function(d) { return y.rangeBand(); })
	 .attr('width', function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
	 
	 var gxAxis = svg.append('g')
	 .attr('class', 'x axis')
	 .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
	 .call(xAxis);
	 
	 svg.append('g').attr('class', 'y axis').call(yAxis);

    };
    
    
    gantt.margin = function(value) {
	if (!arguments.length)
	    return margin;
	margin = +value;
	return gantt;
    };

    gantt.timeDomain = function(value) {
	if (!arguments.length)
	    return [ timeDomainStart, timeDomainEnd ];
	timeDomainStart = +value[0], timeDomainEnd = +value[1];
	return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
	if (!arguments.length)
	    return timeDomainMode;
        timeDomainMode = value;
        return gantt;

    };

    gantt.taskTypes = function(value) {
	if (!arguments.length)
	    return taskTypes;
	taskTypes = value;
	return gantt;
    };
    
    gantt.taskStatus = function(value) {
	if (!arguments.length)
	    return taskStatus;
	taskStatus = value;
	return gantt;
    };

    gantt.width = function(value) {
	if (!arguments.length)
	    return width;
	width = +value;
	return gantt;
    };

    gantt.height = function(value) {
	if (!arguments.length)
	    return height;
	height = +value;
	return gantt;
    };

    gantt.tickFormat = function(value) {
	if (!arguments.length)
	    return tickFormat;
	tickFormat = value;
	return gantt;
    };


    
    return gantt;
};
