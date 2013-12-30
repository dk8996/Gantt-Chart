/**
 * @author Dimitry Kudrayvtsev
 * @version 3.0
 */

d3.gantt = function() {
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    var margin = {
	top : 10,
	right : 40,
	bottom : 15,
	left : 150
    };
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
    var taskTypes = [];
    var taskStatus = [];
    var miniHeight = 100;
    var height = document.body.clientHeight - margin.top - margin.bottom - miniHeight-5;
    var width = document.body.clientWidth - margin.right - margin.left-5;
    
    
    var tickFormat = "%H:%M";

    var keyFunction = function(d) {
	return d.startDate + d.taskName + d.endDate;
    };

    var rectTransform = function(d) {
	return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
    };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var miniY = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, miniHeight ], .1);

    var miniX = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
    
    var miniRectTransform = function(d) {
	return "translate(" + x(d.startDate) + "," + miniY(d.taskName) + ")";
    };
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	    .tickSize(8).tickPadding(8);

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
    

    var miniYAxis = d3.svg.axis().scale(miniY).orient("left").tickSize(0);
	

    var brush = d3.svg.brush();

    var initBrush = function(group,updateGroup) {
        
        var brushed = function() {
	   x.domain(brush.empty() ? miniX.domain() : brush.extent());

           gantt.timeDomain(brush.extent());
           gantt.redrawMain(tasks);
           //updateGroup.select(".x.axis").call(xAxis);
	    
       //var rect = updateGroup.selectAll(".bar").data(tasks, keyFunction);
       //rect.transition()
       //.attr("transform", rectTransform)
       //   .attr("height", function(d) { return y.rangeBand(); })
	//   .attr("width", function(d) { 
	//     return (x(d.endDate) - x(d.startDate)); 
	 //    }); 
        }
        
        brush
        .x(miniX)
        .on("brush", brushed);

        group.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", miniHeight);
        
    };
  

    var initTimeDomain = function(tasks) {
	if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
	    if (tasks === undefined || tasks.length < 1) {
		timeDomainStart = d3.time.day.offset(new Date(), -3);
		timeDomainEnd = d3.time.hour.offset(new Date(), +3);
		return;
	    }
	    tasks.sort(function(a, b) {
		return a.endDate - b.endDate;
	    });
	    timeDomainEnd = tasks[tasks.length - 1].endDate;
	    tasks.sort(function(a, b) {
		return a.startDate - b.startDate;
	    });
	    timeDomainStart = tasks[0].startDate;
	}
    };

    var initAxisMini = function() {
	miniY = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, miniHeight ], .1);
	miniX = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

	miniYAxis = d3.svg.axis().scale(miniY).orient("left").tickSize(0);
    };

    var initAxis = function() {
	x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);

	xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
		.tickSize(8).tickPadding(8);

	yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
	
    };
    
    function gantt(tasks) {
	
	initTimeDomain(tasks);
	initAxis();
        initAxisMini();
	
	var body = d3.select("body")
	.append("svg")
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom + miniHeight);
	
	var ganttChartGroup = body.append("g")
        .attr("class", "gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	
	var miniGanttChartGroup = body.append("g")
        .attr("class", "mini-gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", miniHeight)
	.attr("transform", "translate(" + margin.left + ", " + (height + margin.bottom) + ")");
	
	miniGanttChartGroup.selectAll(".mini-gantt-chart")
	.data(tasks, keyFunction).enter()
	.append("rect")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "bar " + taskStatus[d.status];
	     }) 
	 .attr("y", 0)
	 .attr("transform", miniRectTransform)
	 .attr("height", function(d) { return miniY.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
	
	ganttChartGroup.selectAll(".chart")
	 .data(tasks, keyFunction).enter()
	 .append("rect")
	 .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "bar " + taskStatus[d.status];
	     }) 
	 .attr("y", 0)
	 .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
	 
	 
     ganttChartGroup.append("g")
	 .attr("class", "x axis")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxis);

        	 
      ganttChartGroup.append("g").attr("class", "y axis").transition().call(yAxis);

      miniGanttChartGroup.append("g").attr("class", "y axis").transition().call(miniYAxis);

      initBrush(miniGanttChartGroup, ganttChartGroup);

      return gantt;

    };
    
    gantt.redrawMini = function(tasks) {
        initAxisMini();

        var svg = d3.select("svg");
	svg.select(".x").transition().call(xAxis);
	svg.select(".y").transition().call(yAxis);
	
        var miniGanttChartGroup = svg.select(".mini-gantt-chart");
        var miniRect = miniGanttChartGroup.selectAll(".bar").data(tasks, keyFunction);
	
        miniRect.enter()
        .insert("rect",":first-child")
        .attr("rx", 5)
        .attr("ry", 5)
	.attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "bar " + taskStatus[d.status];
	     }) 
	 .transition()
	 .attr("y", 0)
	 .attr("transform", miniRectTransform)
	 .attr("height", function(d) { return miniY.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
        
        miniRect.transition()
        .attr("transform", miniRectTransform)
	 .attr("height", function(d) { return miniY.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
      
        miniRect.exit().remove();
        brush.x(miniX);	
	return gantt;
    };
	
    gantt.redraw = function(tasks) {
	initTimeDomain(tasks);
        gantt.redrawMain(tasks).redrawMini(tasks);
	return gantt;
    }

    gantt.redrawMain = function(tasks) {

	initAxis();
	
        var svg = d3.select("svg");

        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll(".bar").data(tasks, keyFunction);
        
        rect.enter()
         .insert("rect",":first-child")
         .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return "bar " + taskStatus[d.status];
	     }) 
	 .transition()
	 .attr("y", 0)
	 .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });

        rect.transition()
         .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
        
	rect.exit().remove();
	
	return gantt;
    };

    gantt.margin = function(value) {
	if (!arguments.length)
	    return margin;
	margin = value;
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
