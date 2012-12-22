var data = [{"date":"2012-03-20","total":3},{"date":"2012-03-21","total":8},{"date":"2012-03-22","total":2},{"date":"2012-03-23","total":10},{"date":"2012-03-24","total":3},{"date":"2012-03-25","total":20},{"date":"2012-03-26","total":12}];

var data = [
{"date":"Nov 18 08:00:00 EST 2012","endDate":"Nov 18 09:16:47 EST 2012","jobName":"Parsing Job","status":"SUCCEEDED"},
{"date":"Nov 18 09:28:54 EST 2012","endDate":"Nov 18 10:15:58 EST 2012","jobName":"Distributed SCP/FTP Job","status":"RUNNING"},
{"date":"Nov 18 09:52:06 EST 2012","endDate":"Nov 18 10:01:23 EST 2012","jobName":"ETL Aggregation","status":"FAILED"},
{"date":"Nov 18 10:58:59 EST 2012","endDate":"Nov 18 11:16:47 EST 2012","jobName":"Parsing Job","status":"SUCCEEDED"},
{"date":"Nov 18 09:28:54 EST 2012","endDate":"Nov 18 10:15:58 EST 2012","jobName":"Distributed SCP/FTP Job","status":"RUNNING"}];

var jobs = ["Distributed SCP/FTP Job","Parsing Job","Attribution Job","Normalization Job", "ETL Aggregation"];
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

window.transition = function(period) {
    
};

var margin = {top: 40, right: 40, bottom: 40, left:150},
    width = 1000,
    height = 500;

data.sort(function(a,b){return new Date(a.endDate)-new Date(b.endDate);});
var maxDate = data[data.length-1].endDate;
data.sort(function(a,b){return new Date(a.date)-new Date(b.date);});
var minDate = data[0].date;


var x = d3.time.scale()
    .domain([new Date(minDate), d3.time.hour.offset(new Date(maxDate), 5)])
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

svg.selectAll('.chart')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr("y", 0)
    .attr("transform", function(d) { return "translate("+ x(new Date(d.date)) + "," + y(d.jobName) + ")"; })
    .attr('width',  function(d) { return x(new Date(d.endDate))-x(new Date(d.date)); })
    .attr('height', function(d) { return y.rangeBand(); });

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis);

svg.append("line")
    .attr("x1", x(new Date(maxDate)))
    .attr("y1", 0)
    .attr("x2", x(new Date(maxDate)))
    .attr("y2", height)
    .style("stroke", "rgba(255,136,0,0.7)")
    .style("stroke-width", 5);

