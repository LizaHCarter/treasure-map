/* jshint unused:false, camelcase:false */
/* global google:true, _:true */

(function(){
  'use strict';

  var map,
      directionsDisplay;

  $(document).ready(function(){
    initMap(36, -102, 3);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    var locations = getLocations();
    calcRoute(locations);
  });

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function calcRoute(locs){
    var directionsService = new google.maps.DirectionsService(),
        start = _.min(locs, 'order'),
        end = _.max(locs, 'order'),
        waypts = _.cloneDeep(locs);
    _.remove(waypts, function(point){
      return point.order === start.order;
    });
    _.remove(waypts, function(point){
      return point.order === end.order;
    });
    waypts.sort(function(a, b){
      return a.order - b.order;
    });
    waypts = waypts.map(function(p){
      return {location:p.name, stopover:true};
    });
    var request = {
      origin: start.name,
      destination: end.name,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status){
      if (status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    });
  }

  function getLocations(){
    var locations = $('table tbody tr').toArray().map(function(o){
      var loc = {};
      loc.name = $(o).attr('data-name');
      loc.lat = parseFloat($(o).attr('data-loc[lat]'));
      loc.lng = parseFloat($(o).attr('data-loc[lng]'));
      loc.order = parseInt($(o).attr('data-order'));
      return loc;
    });
    return locations;
  }

})();
