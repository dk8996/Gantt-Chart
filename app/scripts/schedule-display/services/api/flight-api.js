'use strict';

angular.module('ScheduleDisplay').service('FlightSrvApi', function($http, $q) {

  var service = {};

  service.getFlights = function() {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: '/scripts/schedule-display/services/api/flight.json'
    })
    .success(
      function(response) {
        console.log('Get Available Flights - success');
        console.log(response);
        deferred.resolve(response);
      })
    .error(
      function(response) {
        console.log('Get Available Flights - error');
        console.log(response);
        deferred.reject(response.responseStatus.errorMessage);
      });

    return deferred.promise;
  };

  return service;

});