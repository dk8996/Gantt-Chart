var data = [{"date":"2012-03-20","total":3},{"date":"2012-03-21","total":8},{"date":"2012-03-22","total":2},{"date":"2012-03-23","total":10},{"date":"2012-03-24","total":3},{"date":"2012-03-25","total":20},{"date":"2012-03-26","total":12}];

var data = [
{"date":"Sun Dec 09 06:36:45 EST 2012","endDate":"Sun Dec 09 06:54:59 EST 2012","jobName":"ETL Aggregation","status":"RUNNING"},
{"date":"Sun Dec 09 04:56:32 EST 2012","endDate":"Sun Dec 09 06:35:47 EST 2012","jobName":"Attribution Job","status":"RUNNING"},
{"date":"Sun Dec 09 06:29:53 EST 2012","endDate":"Sun Dec 09 06:34:04 EST 2012","jobName":"Distributed SCP/FTP Job","status":"RUNNING"},
{"date":"Sun Dec 09 05:39:21 EST 2012","endDate":"Sun Dec 09 06:21:22 EST 2012","jobName":"Parsing Job","status":"RUNNING"},
{"date":"Sun Dec 09 05:00:06 EST 2012","endDate":"Sun Dec 09 05:05:07 EST 2012","jobName":"Distributed SCP/FTP Job","status":"RUNNING"},
{"date":"Sun Dec 09 03:46:59 EST 2012","endDate":"Sun Dec 09 04:54:19 EST 2012","jobName":"Parsing Job","status":"RUNNING"},
{"date":"Sun Dec 09 04:02:45 EST 2012","endDate":"Sun Dec 09 04:48:56 EST 2012","jobName":"Normalization Job","status":"RUNNING"},
{"date":"Sun Dec 09 03:27:35 EST 2012","endDate":"Sun Dec 09 03:58:43 EST 2012","jobName":"ETL Aggregation","status":"SUCCEEDED"},
{"date":"Sun Dec 09 01:40:11 EST 2012","endDate":"Sun Dec 09 03:26:35 EST 2012","jobName":"Attribution Job","status":"SUCCEEDED"},
{"date":"Sun Dec 09 03:00:03 EST 2012","endDate":"Sun Dec 09 03:09:51 EST 2012","jobName":"Distributed SCP/FTP Job","status":"SUCCEEDED"},
{"date":"Sun Dec 09 01:21:00 EST 2012","endDate":"Sun Dec 09 02:51:42 EST 2012","jobName":"Parsing Job","status":"SUCCEEDED"},
{"date":"Sun Dec 09 01:08:42 EST 2012","endDate":"Sun Dec 09 01:33:42 EST 2012","jobName":"Normalization Job","status":"SUCCEEDED"},
{"date":"Sun Dec 09 00:27:15 EST 2012","endDate":"Sun Dec 09 00:54:56 EST 2012","jobName":"ETL Aggregation","status":"SUCCEEDED"},
{"date":"Sun Dec 09 00:29:48 EST 2012","endDate":"Sun Dec 09 00:44:50 EST 2012","jobName":"Distributed SCP/FTP Job","status":"SUCCEEDED"},
{"date":"Sat Dec 08 23:12:24 EST 2012","endDate":"Sun Dec 09 00:26:13 EST 2012","jobName":"Attribution Job","status":"SUCCEEDED"}];

var jobs = ["Distributed SCP/FTP Job","Parsing Job","ETL Aggregation","Normalization Job","Attribution Job"];
var status = ["SUCCEEDED","FAILED","RUNNING"];

var data2;
var trList;
var tdList;

d3.html("jobtracker.jsp", function(document) {
	// nodeList2 =
	// document.querySelectorAll(".sortable")[1].querySelectorAll("tr");
	trList = document.querySelectorAll(".sortable")[1].querySelectorAll("tr");
	tdList = document.querySelectorAll("td");
	for ( var i = 0; i < tdList.length; i++) {
		oneTD = tdList[i];
		allA = oneTD.querySelectorAll("a");
		if (allA.lenght !== 0) {
			oneA = allA[0];
		}
	}
});


var margin = {top: 40, right: 10, bottom: 50, left:140},
    width = 1200,
    height = 500;

data.sort(function(a,b){return new Date(a.endDate)-new Date(b.endDate);});
var maxDate = data[data.length-1].endDate;
data.sort(function(a,b){return new Date(a.date)-new Date(b.date);});
var minDate = data[0].date;
var nowDate = maxDate;
var startDate = d3.time.hour.offset(new Date(nowDate), -19);

window.transition = function(period) {
    if(period === "Week") {
        startDate = d3.time.day.offset(new Date(nowDate), -7);
        x.domain([startDate, d3.time.hour.offset(new Date(nowDate), 5)]);
	xAxis.ticks(d3.time.hours, 12)
        .tickFormat(d3.time.format('%b %e %H'));
    }
    if(period === "Day") {
        startDate = d3.time.hour.offset(new Date(nowDate), -19);
        x.domain([startDate, d3.time.hour.offset(new Date(nowDate), 5)]);
	xAxis.ticks(d3.time.hours, 1)
        .tickFormat(d3.time.format('%H:%M'));
    }
    if(period === "Month") {
        startDate = d3.time.month.offset(new Date(nowDate), -1);
        x.domain([startDate, d3.time.hour.offset(new Date(nowDate), 5)]);
	xAxis.ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%b %e'));
    }
    if(period === "Hour") {
        startDate = d3.time.hour.offset(new Date(nowDate), -7);
        x.domain([startDate, d3.time.hour.offset(new Date(nowDate), 5)]);
	xAxis.ticks(d3.time.minutes, 30)
        .tickFormat(d3.time.format('%H:%M'));
    }
       
        svg.selectAll("rect").transition()
       .duration(750)
       .delay(function(d, i) { return i * 10; })
       .attr("transform", function(d) { return "translate("+ x(new Date(d.date)) + "," + y(d.jobName) + ")"; })
       .attr('height', function(d) { return y.rangeBand(); })
       .attr('width',  function(d) { 
	   return x(new Date(d.endDate))-x(new Date(d.date)); 
	   });

	svg.selectAll("line").transition()
        .attr("x1", x(new Date(nowDate)))
        .attr("x2", x(new Date(nowDate)));
        gxAxis.transition().call(xAxis);
   
};

var onMouseOverTask = function(task)
{
     svg.append("line")
    .attr("class", "task-guidelines")
    .attr("x1", x(new Date(task.date)))
    .attr("y1", y(task.jobName))
    .attr("x2", x(new Date(task.date)))
    .attr("y2", height-50);

    svg.append("line")
    .attr("class", "task-guidelines")
    .attr("x1", x(new Date(task.endDate)))
    .attr("y1", y(task.jobName))
    .attr("x2", x(new Date(task.endDate)))
    .attr("y2", height-50);

    var format = d3.time.format('%H:%M');
    var diffTime = new Date(task.endDate).getTime()-new Date(task.date).getTime();
    var oneHour = 1000*60*60;
    var oneMinute = 1000*60;

    var h = Math.floor(diffTime/oneHour);
    var m = Math.floor((diffTime - (h * oneHour))/oneMinute);
    var text = h + "h " + m +"m";
    if(h === 0) {
        text = m +"m";
    }

    svg.append("text")
    .attr("class", "task-text")
    .attr("dx", x(new Date(task.date)))
    .attr("dy",y(task.jobName)- 1)
    .text(text);
    
    svg.append("text")
    .attr("class", "task-text")
    .attr("dx", x(new Date(task.endDate)))
    .attr("dy", height - 40)
    .text(format(new Date(task.endDate)));

    svg.append("text")
    .attr("class", "task-text")
    .attr("dx", x(new Date(task.date)))
    .attr("dy", height - 55)
    .text(format(new Date(task.date)));

};

var onMouseOutTask = function(task)
{
   d3.selectAll(".task-guidelines").remove();
   d3.selectAll(".task-text").remove();	
};


var x = d3.time.scale()
    .domain([startDate, d3.time.hour.offset(new Date(nowDate), 5)])
    .rangeRound([0, width - margin.left - margin.right]);

var y = d3.scale.ordinal()
    .domain(jobs)
    .rangeRoundBands([0, height - margin.top - margin.bottom],.1);

var z = d3.scale.ordinal()
    .domain(status)
    .rangeRoundBands([0, height - margin.top - margin.bottom],.1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.hours, 1)
    .tickFormat(d3.time.format('%H:%M'))
    .tickSize(0)
    .tickPadding(8);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0);



var svg = d3.select('body').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var chart = svg.selectAll('.chart')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .on("mouseover", function(d) { onMouseOverTask(d); })
    .on("mouseout", function(d) { onMouseOutTask(d); })
    .attr("y", 0)
    .attr("transform", function(d) { return "translate("+ x(new Date(d.date)) + "," + y(d.jobName) + ")"; })
    .attr('height', function(d) { return y.rangeBand(); })
    .transition()
    .attr('width',  function(d) { return x(new Date(d.endDate))-x(new Date(d.date)); })
    .style("fill", function(d) { if(d.status === "FAILED") { return "#CC0000"; }  });


var nowLine = svg.append("line")
    .attr("x1", x(new Date(nowDate)))
    .attr("y1", 0)
    .attr("x2", x(new Date(nowDate)))
    .attr("y2", height)
    .transition()
    .style("stroke", "rgba(255,136,0,0.7)")
    .style("stroke-width", 5);

var gxAxis = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis);




