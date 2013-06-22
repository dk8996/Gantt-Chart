example();

function example() {
    var tasks = [];

    var taskStatus = {
	"Bill Johnson" : "bar",
	"Joe Johnson" : "bar-red",
    };

    d3.json("http://localhost:8000/example.json", function(error, json) {
	if (error)
	    return console.warn(error);
	var taskNames = [];
	for ( var i = 0; i < json.length; i++) {
	    for ( var j = 0; j < json[i].values.length; j++) {
		var role = json[i].values[j]["Role"];
		var company = json[i].values[j]["Company"];
		var roleAndCompany = role + "(" + company + ")";
		var name = json[i]["name"];
		taskNames.push(roleAndCompany);
		tasks.push({
		    "startDate" : new Date(json[i].values[j]["from date"]),
		    "endDate" : new Date(json[i].values[j]["to date"]),
		    "taskName" : roleAndCompany,
		    "status" : name
		});
	    }
	}
	var format = "%b-%e-%y";
	var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
	gantt(tasks);
    });

};

