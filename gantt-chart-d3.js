/**
 * 
 * @author Dimitry Kudrayvtsev
 * @version 2.x
 */

d3.gantt = function () {
	var FIT_TIME_DOMAIN_MODE = "fit";
	var FIXED_TIME_DOMAIN_MODE = "fixed";
	//default margins
	var margin = {
		top : 20,
		right : 40,
		bottom : 20,
		left : 150
	};
	
	//default rectangle rounding in pixels
	var rectRound=5;
	//default : there is no horizontal lines in gantt chart.
	var horizontalLines = false;
	
	var timeDomainStart = d3.time.day.offset(new Date(), -3);
	var timeDomainEnd = d3.time.hour.offset(new Date(), +3);
	var timeDomainMode = FIT_TIME_DOMAIN_MODE; // fixed or fit
	var taskTypes = [];
	var taskStatus = [];
	var height = document.body.clientHeight - margin.top - margin.bottom - 5;
	var width = document.body.clientWidth - margin.right - margin.left - 5;
	
	var tickFormat = "%H:%M";

	var tip;
	// Vars initialized via initAxis function.
	var x;
	var y;
	var xAxis;
	var yAxis;
	
	var keyFunction = function (d) {
		return d.startDate + d.taskName + d.endDate;
	};

	var rectTransform = function (d) {
		return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
	};

	var tipFunction = function (d) {
		var format = d3.time.format("%H:%M:%S");
		return d.taskName + " - " + format(d.startDate) + " > " + format(d.endDate);
	};
		
	var clickFunctionOverriden = false;
	var clickFunction = function (d) {
		return;
	};
	
	var activateZooming = false;
	var zoomed = function(tasks) { //zoomed function
		var svg = d3.select(".chart");
		//update x axis only while zooming
		svg.select(".x.axis").call(xAxis);
		
		var rectGroup = svg.select(".rect-group");
		//move right and left lines
		rectGroup.selectAll("line").attr("transform", "translate(" + [d3.event.translate[0], 0] + ") scale(" + d3.event.scale + ", 1)");
		
		//move tasks
		rectGroup.selectAll("rect").data(tasks, keyFunction)
			//function of update of the tasks : no exit nor enter while zooming.
			.attr("transform", rectTransform)
			.attr("width", function (d) {
				return (x(d.endDate) - x(d.startDate));
		});
	};
	
	
	var initTimeDomain = function (tasks) {
		if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
			if (tasks === undefined || tasks.length < 1) {
				timeDomainStart = d3.time.day.offset(new Date(), -3);
				timeDomainEnd = d3.time.hour.offset(new Date(), +3);
				return;
			}
			tasks.sort(function (a, b) {
				return a.endDate - b.endDate;
			});
			timeDomainEnd = tasks[tasks.length - 1].endDate;
			tasks.sort(function (a, b) {
				return a.startDate - b.startDate;
			});
			timeDomainStart = tasks[0].startDate;
		}
	};

	var initAxis = function () {
		x = d3.time.scale()
			.domain([timeDomainStart, timeDomainEnd])
			.range([0, width]);
		if (!activateZooming) {
			x.clamp(true);
		}
			
		y = d3.scale.ordinal()
			.domain(taskTypes)
			.rangeRoundBands([0, height - margin.top - margin.bottom], .1);
			
		xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.tickFormat(d3.time.format(tickFormat))
			.tickSubdivide(true)
			.tickSize(8)
			.tickPadding(8);

		var tickSizeWidth = 0;
		if (horizontalLines) {
			tickSizeWidth = -width;
		}
		yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickSize(tickSizeWidth);
	};
	
	var updateFontSizeYAxis = function() {
		//compute the height of the font for the yAxis (necessary for lots of values).
		var currYAxis = d3.select(".y.axis text");
		if (!currYAxis.empty()) {
			var currFontHeight = parseInt(d3.select(".y.axis text").style("font-size"));
			var newFontHeight = Math.round((height - margin.top - margin.bottom) / taskTypes.length) + 2;
			if (newFontHeight > 25) { // do not display too big texts.
				newFontHeight = 25;
			}
			d3.selectAll(".y.axis text").style("font-size", newFontHeight);
		}
	}
	
	var initTip = function(selection) {
		if (d3.tip) {
			tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([10, 0])
			  .direction("s")
			  .html(tipFunction);
			selection.call(tip);
		} else {
			//fake a tip implementation that does nothing.
			tip = function() {
				show = function() {};
				hide = function() {};
			};
		}
	};

	var computeTasksTypes = function (tasks) {
		if (tasks === undefined || tasks.length < 1) {
			return [];
		}
		taskTypes = [];
		for (var index = 0; index < tasks.length; ++index) {
			taskTypes[index] = tasks[index].taskName;
		}
	};
	
	function gantt(tasks) {

		initTimeDomain(tasks);
		computeTasksTypes(tasks);
		initAxis();

		var ganttChartGroup = d3.select("body")
			.append("svg") // svg global chart 
			.attr("class", "chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g") // ganttChartGroup for all svg content.
			.attr("class", "gantt-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
		if (activateZooming) {			
			//zoom declaration done here because otherwise x and y could not be initialized.
			var zoom = d3.behavior.zoom()
				.x(x)
				//.y(y) //No zooming on y axis.
				.on("zoom", function() {zoomed(tasks)});
			ganttChartGroup.call(zoom); //bind the zoom event listener.
		}
		
		var zoomRect = ganttChartGroup.append("rect") //adds a rect in order to be able to zoom from wherever on the svg.
			.attr("class", "zoom-rect")
			.attr("width", width)
			.attr("height", height)
			.style("fill", "none")
			.style("pointer-events", "all");
		
		ganttChartGroup.call(initTip); //allow tip on elements.
		
		//add axis before rect contents for z-index considerations : axis should be under usefull content.
		ganttChartGroup.append("g").attr("class", "x axis") //append x axis
			.attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
			.transition()
			.call(xAxis);

		ganttChartGroup.append("g").attr("class", "y axis")  //append y axis
			.transition()
			.call(yAxis);
		
		//addition of a clipping path in order to hide the panned or zoomed elements.
		ganttChartGroup.append("clipPath")
				.attr("id", "clipID")
				.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", width)
				.attr("height", height);
		
		//adds the usefull content : rectangles for each task.
		var rectGroup = ganttChartGroup.append("g").attr("clip-path","url(#clipID)").attr("class", "rect-group");
		//right and left lines of the gantt.
		rectGroup.append("line").attr("id", "rightLine").attr("class", "blockLine").attr("x1", width).attr("y1", 0).attr("x2", width).attr("y2", height - margin.top - margin.bottom);
		rectGroup.append("line").attr("id", "leftLine").attr("class", "blockLine").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", height - margin.top - margin.bottom);
		
		rectGroup.selectAll(".chart")
			.data(tasks, keyFunction).enter()
			.append("rect") //append all rect for the gantt graph.
			.attr("rx", rectRound)
			.attr("ry", rectRound)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) {
					return "bar";
				}
				return taskStatus[d.status];
			})
			.attr("y", 0)
			.attr("transform", rectTransform)
			.attr("height", function (d) {
				return y.rangeBand();
			})
			.attr("width", function (d) {
				return (x(d.endDate) - x(d.startDate));
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
			.on('click', clickFunction)
			.style("cursor", function() {
				if (clickFunctionOverriden) {
					return "pointer";
				} else {
					return "default";
				}
			})
			;

		updateFontSizeYAxis();
		
		return gantt;

	};

	gantt.redraw = function (tasks) {

		initTimeDomain(tasks);
		computeTasksTypes(tasks);
		initAxis();

		var svg = d3.select("svg");
		//update width and height of global elements : svg, gantt-chart group,...
		svg.transition()
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);
			
		var ganttChartGroup = svg.select(".gantt-chart");
		ganttChartGroup.transition()
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
		
		if (activateZooming) {			
			//zoom declaration done here because otherwise x and y could not be initialized.
			var zoom = d3.behavior.zoom()
				.x(x)
				//.y(y) //No zooming on y axis.
				.on("zoom", function() {zoomed(tasks)});
			ganttChartGroup.call(zoom); //bind the zoom event listener.
		}
		
		svg.select(".zoom-rect").transition()
			.attr("width", width)
			.attr("height", height);

		//resize clippath.
		svg.select("#clipID rect")
			.attr("width", width)
			.attr("height", height);
		
		ganttChartGroup.select(".x.axis")
			.attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")");
		
		ganttChartGroup.call(initTip); //allow tip on elements.

		var rectGroup = ganttChartGroup.select(".rect-group");
		//right and left lines of the gantt to reposition.
		var scale = d3.event ? d3.event.scale : 1 ;
		var translate = d3.event ? d3.event.translate[0] : 0;
		rectGroup.selectAll(".blockLine").attr("transform", "translate(" + [translate, 0] + ") scale(" + scale + ", 1)");
		
		var rect = rectGroup.selectAll("rect").data(tasks, keyFunction);
		rect.enter()
			.insert("rect", ":first-child")
			.attr("rx", rectRound)
			.attr("ry", rectRound)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) {
					return "bar";
				}
				return taskStatus[d.status];
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
			.on('click', clickFunction)
			.style("cursor", function() {
				if (clickFunctionOverriden) {
					return "pointer";
				} else {
					return "default";
				}
			})
			.transition()
			.attr("y", 0)
			.attr("transform", rectTransform)
			.attr("height", function (d) {
				return y.rangeBand();
			})
			.attr("width", function (d) {
				return (x(d.endDate) - x(d.startDate));
			});

		rect.transition()
			.attr("transform", rectTransform)
			.attr("height", function (d) {
				return y.rangeBand();
			})
			.attr("width", function (d) {
				return (x(d.endDate) - x(d.startDate));
			});

		rect.exit().remove();

		svg.select(".x").transition().call(xAxis);
		svg.select(".y").transition().call(yAxis);

		updateFontSizeYAxis();

		return gantt;
	};

	gantt.margin = function (value) {
		if (!arguments.length)
			return margin;
		margin = value;
		return gantt;
	};

	gantt.timeDomain = function (value) {
		if (!arguments.length)
			return [timeDomainStart, timeDomainEnd];
		timeDomainStart = +value[0], timeDomainEnd = +value[1];
		return gantt;
	};

	/**
	 * @param {string}
	 *                vale The value can be "fit" - the domain fits the data or
	 *                "fixed" - fixed domain.
	 */
	gantt.timeDomainMode = function (value) {
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
	
	gantt.taskStatus = function (value) {
		if (!arguments.length)
			return taskStatus;
		taskStatus = value;
		return gantt;
	};

	gantt.width = function (value) {
		if (!arguments.length)
			return width;
		width = +value;
		return gantt;
	};

	gantt.height = function (value) {
		if (!arguments.length)
			return height;
		height = +value;
		return gantt;
	};

	gantt.rectRound = function (value) {
		if (!arguments.length)
			return rectRound;
		rectRound = value;
		return gantt;
	};
	
	gantt.tickFormat = function (value) {
		if (!arguments.length)
			return tickFormat;
		tickFormat = value;
		return gantt;
	};
	
	gantt.tipFunction = function (value) {
		if (!arguments.length)
			return tipFunction;
		tipFunction = value;
		return gantt;
	};
	
	gantt.clickFunction = function (value) {
		if (!arguments.length)
			return clickFunction;
		clickFunction = value;
		clickFunctionOverriden = true;
		return gantt;
	};
	
	gantt.horizontalLines = function (value) {
		if (!arguments.length)
			return horizontalLines;
		horizontalLines = value;
		return gantt;
	};
	
	gantt.activateZooming = function (value) {
		if (!arguments.length)
			return activateZooming;
		activateZooming = value;
		return gantt;
	};
	
	return gantt;
};
