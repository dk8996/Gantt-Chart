'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'AppConfig'
    ,'ngRoute'
    ,'ngResource'
    ,'ngAnimate'
    ,'ngTouch'
    ,'ScheduleDisplay'
    // yo:ngMainModules
];


angular.module('CrewSchedGUI', _mainModules )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider.otherwise({
            redirectTo: '/schedule-display'
        });

        var routes = [];

        routes.push({
            name: '/schedule-display',
            params: {
                templateUrl: 'scripts/schedule-display/views/main.html',
                controller: 'mainCtrl'
            }
        });

// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });
