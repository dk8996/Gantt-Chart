## Introduction
A basic implementation of a Gantt Chart using D3.js. Here is a example [Example 1] (http://bl.ocks.org/dk8996/5534835) and another one [Example 2] (http://bl.ocks.org/dk8996/5449641).

![screenshot](https://raw.github.com/dk8996/Gantt-Chart/master/examples/screenshot1.png)

## Getting Started
### Data
Create a array of all your data.

```javascript
var tasks = [

{
    "startDate": new Date("Sun Dec 09 01:36:45 EST 2012"),
    "endDate": new Date("Sun Dec 09 02:36:45 EST 2012"),
    "taskName": "E Job",
    "status": "FAILED"
},

{
    "startDate": new Date("Sun Dec 09 04:56:32 EST 2012"),
    "endDate": new Date("Sun Dec 09 06:35:47 EST 2012"),
    "taskName": "A Job",
    "status": "RUNNING"
}];

```

### Style
Create a map between task status and css class, this is optional.

```javascript
var taskStatus = {
    "SUCCEEDED": "bar",
    "FAILED": "bar-failed",
    "RUNNING": "bar-running",
    "KILLED": "bar-killed"
};
```

```css
  .bar {
      fill: #33b5e5;
  }
  
  .bar-failed {
    fill: #CC0000;
  }

  .bar-running {
      fill: #669900;
  }
  
  .bar-succeeded {
    fill: #33b5e5;
  }

  .bar-killed {
      fill: #ffbb33;
  }
```
### Task Names
Create a array of task names, they will be display on they y-axis in the order given to the array.

```javascript
var taskNames = [ "D Job", "P Job", "E Job", "A Job", "N Job" ];
```

### Create a Simple Gantt-Chart
Create a simple Gantt-Chart

```javascript
var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus);
gantt(tasks);
```

## Dependencies & Building
Relies on the fantastic [D3 visualization library](http://mbostock.github.com/d3/) to do lots of the heavy lifting for stacking and rendering to SVG.

## License

   Copyright 2012 Dimitry Kudryavtsev

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
   [![githalytics.com alpha](https://cruel-carlota.pagodabox.com/c088458a0319a78b63aaea9c54fba4de "githalytics.com")](http://githalytics.com/dk8996/Gantt-Chart)
