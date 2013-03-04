d3.gantt = function() {
    
    margin = {
	top : 40,
	right : 40,
	bottom : 30,
	left : 150
    };
    timeDomainStart = d3.time.day.offset(new Date(), -4);
    timeDomainEnd = d3.time.hour.offset(new Date(), 3);
    timeDomainMode = "fixed";// fixed or data
    taskTypes = [];
    height = 600;
    width = 800;
    
    x = d3.time.scale()
    .domain([ timeDomainStart, timeDomainEnd ])
    .range([ 0, width])
    .clamp(true);

    y = d3.scale.ordinal()
    .domain(taskTypes)
    .rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);

    tickFormat = '%H:%M';
    
    xAxis = d3.svg.axis().scale(x)
    .orient('bottom')
    .ticks(d3.time.hours, 1)
    .tickFormat(d3.time.format(tickFormat))
    .tickSize(8)
    .tickPadding(8);
   
    yAxis = d3.svg.axis().scale(y)
    .orient("left").tickSize(0);
    
    function gantt(tasks) {
	
	tasks.sort(function(a, b) {
	    return a.endDate - b.endDate;
	});
	var maxDate = tasks[tasks.length - 1].endDate;
	tasks.sort(function(a, b) {
	    return a.startDate - b.startDate;
	});
	var minDate = tasks[0].startDate;
	
	x = d3.time.scale()
	.domain([ minDate, maxDate ])
	.range([ 0, width])
	.clamp(true);
	
	y = d3.scale.ordinal()
	.domain(taskTypes)
	.rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
	
	xAxis = d3.svg.axis().scale(x)
	.orient('bottom')
	.ticks(d3.time.hours, 1)
	.tickFormat(d3.time.format(tickFormat))
	.tickSize(8)
	.tickPadding(8);
	   
	yAxis = d3.svg.axis().scale(y)
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
	 .attr('class', 'bar') 
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
    
    
    gantt.margin = function(_) {
	if (!arguments.length)
	    return margin;
	margin = +_;
	return gantt;
    };

    gantt.timeDomain = function(_) {
	if (!arguments.length)
	    return [ timeDomainStart, timeDomainEnd ];
	timeDomainStart = +_[0], timeDomainEnd = +_[1];
	return gantt;
    };

    gantt.taskTypes = function(_) {
	if (!arguments.length)
	    return taskTypes;
	taskTypes = _;
	return gantt;
    };

    gantt.width = function(_) {
	if (!arguments.length)
	    return width;
	width = +_;
	return gantt;
    };

    gantt.height = function(_) {
	if (!arguments.length)
	    return height;
	height = +_;
	return gantt;
    };

    gantt.tickFormat = function(_) {
	if (!arguments.length)
	    return tickFormat;
	tickFormat = _;
	return gantt;
    };
    
    return gantt;
};
