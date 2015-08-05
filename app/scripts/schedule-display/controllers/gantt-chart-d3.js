
d3.gantt = function() {


    var keyFunction = function(d) {
		return d.startDate + d.taskName + d.endDate;
    };



    var rectTransform = function(d) {
		return "translate(" + constants.x(d.startDate) + "," + constants.y(d.taskName) + ")";
    };



    var initTimeDomain = function(tasks) {
    	var tasks = constants.tasks;
		if (constants.timeDomainMode === constants.FIT_TIME_DOMAIN_MODE) {
		    if (tasks === undefined || tasks.length < 1) {
				constants.timeDomainStart = d3.time.day.offset(new Date(), -3);
				constants.timeDomainEnd = d3.time.hour.offset(new Date(), +3);
				return;
	    	}

		    tasks.sort(function(a, b) {
				return a.endDate - b.endDate;
		    });

		    constants.timeDomainEnd = tasks[tasks.length - 1].endDate;

		    tasks.sort(function(a, b) {
				return a.startDate - b.startDate;
		    });

		    constants.timeDomainStart = tasks[0].startDate;
		}
    };




    var initAxis = function() {
		constants.x = d3.time.scale().domain([ constants.timeDomainStart, constants.timeDomainEnd ]).range([ 0, constants.width ]).clamp(true);
		constants.y = d3.scale.ordinal().domain(constants.taskTypes).rangeRoundBands([ 0, constants.height - constants.margin.top - constants.margin.bottom ], .7);
		constants.xAxis = d3.svg.axis().scale(constants.x).orient("bottom").tickFormat(d3.time.format(constants.tickFormat)).tickSubdivide(true).tickSize(5).tickPadding(3);
		constants.yAxis = d3.svg.axis().scale(constants.y).orient("left").tickSize(0);
		constants.stamp = d3.time.scale().domain([ new Date()]).range([ 0, constants.width ]);

    };


    //function to draw rectangles
    function drawRects(group) {
    	var rect = group.selectAll("rect").data(constants.tasks, keyFunction);    	

		rect.enter()
			.insert("g", ":first-child")
			.on("click", function(d) {
				d3.select(".selected").classed("selected", false);
            	d3.select(this).classed("selected", true);            	
			})
			.append("rect")
				.attr("rx", 5)
		    	.attr("ry", 5)
				.attr("class", function(d){ 
				    if(constants.taskStatus[d.status] == null){ return "bar";}
					    return constants.taskStatus[d.status];
				    })
				//.transition()
				.attr("y", 0)
				.attr("transform", rectTransform)
				.attr("height", function(d, i) { return constants.y.rangeBand(); })
				.attr("width", function(d) {
				    	return (constants.x(d.endDate) - constants.x(d.startDate));
				    });

		rect.exit().remove();
    };



    
    //function to dra text
    function drawTexts(group) {
    	group.selectAll("text")
			.data(constants.tasks)
			.enter()
			.append("text")
				.text(function(d){
					return d.task;
				})
				.attr("x", function(d) { return ( (constants.x(d.startDate) + constants.x(d.endDate)) / 2 ); })
				.attr("y", function(d) { return constants.y(d.taskName) + 25; })
		       	.attr("text-anchor", "middle")				
				.attr("visibility", function(d){
					return d.textVisible;
				});
    };




    function drawTimeStamp(line) {
		line.append("line")
				.attr("x1", constants.x( new Date()) )
				.attr("x2", constants.x( new Date()) )
				.attr("y1", 0)
				.attr("y2", constants.height - constants.margin.bottom)
				.attr("stroke-width", 2)
		     	.attr("stroke", "red")
				.attr("height", constants.height)
    }








    
    function gantt(tasks) {

		initTimeDomain(tasks);
		initAxis();

		if ( ( constants.height + constants.margin.top + constants.margin.bottom ) < 0 ){
			console.log('leo');
		}
		
		//sets the svg to draw on
		var svg = d3.select("body")
			.append("svg")
				.attr("class", "chart")
				.attr("width", constants.width + constants.margin.left + constants.margin.right)
				.attr("height", constants.height + constants.margin.top + constants.margin.bottom)
			//append a group g with class gantt-chart to attach x, y axes and drawings
			.append("g")
	    	    .attr("class", "gantt-chart")
				.attr("width", constants.width + constants.margin.left + constants.margin.right)
				.attr("height", constants.height + constants.margin.top + constants.margin.bottom)
				.attr("transform", "translate(" + constants.margin.left + ", " + constants.margin.top + ")");


		var line = svg.append("g")
			.attr("class", "time-stamp");


		//append g to group data in pairs (rectangle-text)
		var group = svg.append("g")
			.attr("class", "group");


		//call function to draw rectangles
		drawRects(group);
		//call function to draw text
		drawTexts(group);
		//call function to draw line positioned at actual time
		drawTimeStamp(line);


		 
		//appeng x-axis (time scale)
		svg.append("g")
			.attr("class", "x axis")
			//modify to 0, 0 to poss hour indicator to top
			.attr("transform", "translate(0, " + "0)")
			.transition()
			.call(constants.xAxis);
		
		//append y-axis (tasks)
		svg.append("g").attr("class", "y axis").transition().call(constants.yAxis);
		

		
		 
		return gantt;

    };





    

    


    gantt.redraw = function(tasks) {
		initTimeDomain(tasks);
		initAxis();

		//select the svg
        var svg = d3.select("svg");
        //
        var line = svg.selectAll(".time-stamp");
        //select the groups (rectangles-texts) 
		var group = svg.selectAll(".gantt-chart .group");

		//remove all data from the groups
		group.selectAll("*").data([]).exit().remove();
		line.selectAll("line").data([]).exit().remove();


        //var rect = group.selectAll("rect").data(tasks, keyFunction);        

        //call function to draw rectangles
        drawRects(group);
        //call function to draw text
		drawTexts(group);
		//call function to draw line positioned at actual time
		drawTimeStamp(line);


		svg.select(".x").transition().call(constants.xAxis);
		svg.select(".y").transition().call(constants.yAxis);
		
		return gantt;
    };




    gantt.margin = function(value) {
		if (!arguments.length)
		    return constants.margin;
		margin = value;
		return gantt;
    };



    //hide the text of a rectangle whenever this is out of boundaries
    gantt.hideText = function(dates, tasks) {
    	
    	if(!tasks)
    		return false;

    	var start = dates[0],
    		end = dates[1],
    		length = tasks.length;

		for(var i = 0; i < length; i++) {
    		tasks[i].textVisible = tasks[i].startDate >= start && tasks[i].endDate <= end ? tasks[i].textVisible = "visible" : tasks[i].textVisible = "hidden";
    	}
    };


    

    gantt.timeDomain = function(value, tasks) {
		if (!arguments.length)
		    return [ constants.timeDomainStart, constants.timeDomainEnd ];
		gantt.hideText(value, tasks);
		constants.timeDomainStart = +value[0], constants.timeDomainEnd = +value[1];
		return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
		if (!arguments.length)
		    return constants.timeDomainMode;
	    constants.timeDomainMode = value;
	    return gantt;

    };

    gantt.taskTypes = function(value) {
		if (!arguments.length)
		    return constants.taskTypes;
		constants.taskTypes = value;
		return gantt;
    };
    
    gantt.taskStatus = function(value) {
		if (!arguments.length)
		    return constants.taskStatus;
		constants.taskStatus = value;
		return gantt;
    };

    gantt.width = function(value) {
		if (!arguments.length)
		    return constants.width;
		constants.width = +value;
		return gantt;
    };

    gantt.height = function(value) {
		if (!arguments.length)
		    return constants.height;
		constants.height = +value;
		return gantt;
    };

    gantt.tickFormat = function(value) {
		if (!arguments.length)
		    return constants.tickFormat;
		constants.tickFormat = value;
		return gantt;
    };


    
    return gantt;
};
