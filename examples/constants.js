var constants = {

    "tasks" : flights.flights,

    "taskStatus" : {
        "SUCCEEDED" : "bar height-flight",
        "FAILED" : "bar-failed height-flight",
        "RUNNING" : "bar-running height-flight",
        "KILLED" : "bar-killed height-flight"
    },

    "margin" : {
        top : 20,
        right : 40,
        bottom : 20,
        left : 80
    },

    "taskNames" : [
        "Tail#1 Flight", "Tail#2 Flight", "Tail#3 Flight", "Tail#4 Flight", "Tail#5 Flight"
    ],    

    "addMinutes" : 25,

    "format" : "%H:%M",

    "timeDomainString" : "1day",

    "FIT_TIME_DOMAIN_MODE" : "fit",

    "FIXED_TIME_DOMAIN_MODE" : "fixed",

    "timeDomainStart" : d3.time.day.offset(new Date(),-3),

    "timeDomainEnd" : d3.time.hour.offset(new Date(),+3),

    "taskTypes" : [],

    "tickFormat" : "%H:%M"
}



constants.height = document.body.clientHeight - constants.margin.top - constants.margin.bottom-5,

constants.width = document.body.clientWidth - constants.margin.right - constants.margin.left-5,

constants.maxDate = constants.tasks.length > 0 ? constants.tasks[constants.tasks.length - 1].endDate : new Date();

constants.minDate = constants.tasks.length > 0 ? constants.tasks[0].startDate : new Date();

constants.lastDate = constants.tasks.length - 1;

constants.gantt = d3.gantt().taskTypes(constants.taskNames).taskStatus(constants.taskStatus).tickFormat(constants.format);

constants.x = d3.time.scale().domain([ constants.timeDomainStart, constants.timeDomainEnd ]).range([ 0, constants.width ]).clamp(true),
    
constants.y = d3.scale.ordinal().domain(constants.taskTypes).rangeRoundBands([ 0, constants.height - constants.margin.top - constants.margin.bottom ], .1),

constants.xAxis = d3.svg.axis().scale(constants.x).orient("bottom").tickFormat(d3.time.format(constants.tickFormat)).tickSubdivide(true).tickSize(5).tickPadding(3),

constants.yAxis = d3.svg.axis().scale(constants.y).orient("left").tickSize(0);