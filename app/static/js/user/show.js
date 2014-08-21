/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var pos = getPosition();
    initMap(pos.lat, pos.lng, 11);
    addMarker(pos.lat, pos.lng, pos.name);
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map:map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon:'http://icons.iconarchive.com/icons/manda-pie/nautical/24/Treasure-chest-icon.png'});
  }
  function getPosition(){
    var $treasure = $('#data'),
        name      = $treasure.attr('data-name'),
        lat       = $treasure.attr('data-lat'),
        lng       = $treasure.attr('data-lng'),
        pos       = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

    return pos;
  }
  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom:zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
