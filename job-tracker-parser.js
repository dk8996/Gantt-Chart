var DataURL = {};
DataURL.jobTrackerURL = "http://localhost:50030/jobtracker.jsp";
DataURL.proxyURL = "http://localhost:8080/__ajaxproxy/";
DataURL.jobDetailsURL = "http://localhost:50030/jobdetails.jsp?jobid=";

function JobTrackerParser() {

    this.retrieveDataFromJobTracker = function(callback) {
	if (!callback && typeof(callback) !== "function") {
	    return;
	}
	d3.html(DataURL.proxyURL + DataURL.jobTrackerURL, function(document) {
	    {
		if (!document) {
		    return;
		}
		
		var allA = document.querySelectorAll("a");
		for ( var i = 0; i < allA.length; i++) {
		    var href = allA[i].href;
		    if (href.indexOf("jobid") !== -1) {
			var newURL = swapURL(DataURL.jobTrackerURL, href);
			d3.html(DataURL.proxyURL + newURL, function(document) {
			    if (!document) {
				return;
			    }
			    var task = jobTrackerParser.parseRunningAndCompleted(document);
			    var tasks = new Array();
			    tasks.push(task);
			    callback(tasks);
			});
		    }
		}
		var tasks = jobTrackerParser.parseRetired(document);
		callback(tasks);
	    }
	});
    };
    
    this.parseRetired = function(document) {
	if (!document) {
	    return;
	}
	var tasks = new Array();
	var sortable = document.querySelectorAll(".sortable");
	if (sortable.length > 1) {
	    var trList = sortable[1].querySelectorAll("tr");

	    for ( var j = 0; j < trList.length; j++) {
		var allTD = trList[j].querySelectorAll("td");
		if (allTD[0].id.indexOf("job") !== -1) {
		    task = {
			"taskUID" : allTD[0].textContent.trim(),
			"taskLink" : DataURL.jobDetailsURL + allTD[0].textContent.trim(),
			"date" : allTD[5].textContent.trim(),
			"endDate" : allTD[6].textContent.trim(),
			"taskName" : allTD[3].textContent.trim(),
			"taskStatus" : allTD[4].textContent.trim()
		    };
		    tasks.push(task);
		}
	    }
	}
	return tasks;
    };

    this.parseRunningAndCompleted = function(document) {
	if (!document) {
	    return;
	}
	var lines = document.textContent.split('\n');
	var filterLines = lines.filter(function(n, i) {
	    if (n.split(':').length > 1) {
		return n;
	    }
	});

	var user = "";
	var taskName = "";
	var taskStatus = "";
	var date = "";
	var endDate = nowDate;
	var taskUID = "";

	var taskUIDFilteredLines = lines.filter(function(n, i) {
	    if (n.indexOf('job_') > -1 && n.split(' ').length > 1) {
		return n;
	    }
	});

	var taskUIDLine = taskUIDFilteredLines[0];
	taskUID = taskUIDLine.slice(taskUIDLine.indexOf('job_'), taskUIDLine.length).split(' ')[0].trim();

	for ( var i = 0; i < filterLines.length; i++) {
	    var lineArray = filterLines[i].split(/:(.+)?/);
	    var name = lineArray[0].trim();
	    var value = lineArray[1].trim();

	    switch (name) {
	    case "User":
		user = value;
		break;
	    case "JobName":
		taskName = value;
	    case "Job Name":
		taskName = value;
		break;
	    case "Status":
		taskStatus = value.toUpperCase();
		break;
	    case "Launched At":
		date = value.split('(')[0];
		break;
	    case "Started at":
		date = value;
		break;
	    case "Finished At":
		endDate = value.split('(')[0];
		break;
	    case "Finished at":
		endDate = value.split('(')[0];
		break;
	    }
	}
	task = {
	    "taskUID" : taskUID,
	    "taskLink" : DataURL.jobDetailsURL + taskUID,
	    "date" : date,
	    "endDate" : endDate,
	    "taskName" : taskName,
	    "taskStatus" : taskStatus
	};
	return task;
    };

    function swapURL(src, dest) {
	return src.split(parseURL(src).path)[0] + parseURL(dest).relative;
    };

    //This function creates a new anchor element and uses location
    //properties (inherent) to get the desired URL data. Some String
    //operations are used (to normalize results across browsers).

    function parseURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
	    source : url,
	    protocol : a.protocol.replace(':', ''),
	    host : a.hostname,
	    port : a.port,
	    query : a.search,
	    params : (function() {
		var ret = {}, seg = a.search.replace(/^\?/, '').split('&'), len = seg.length, i = 0, s;
		for (; i < len; i++) {
		    if (!seg[i]) {
			continue;
		    }
		    s = seg[i].split('=');
		    ret[s[0]] = s[1];
		}
		return ret;
	    })(),
	    file : (a.pathname.match(/\/([^\/?#]+)$/i) || [ , '' ])[1],
	    hash : a.hash.replace('#', ''),
	    path : a.pathname.replace(/^([^\/])/, '/$1'),
	    relative : (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [ , '' ])[1],
	    segments : a.pathname.replace(/^\//, '').split('/')
	};
    };
};