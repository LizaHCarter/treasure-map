/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('#addHint').click(addHint);
    $('form').submit(addTreasure);
  });

  function addHint(){
    var $i = $('<input>');
    $i.attr('type', 'text');
    $i.attr('name', 'hints');
    $i.addClass('form-control');
    $i.addClass('inserted');
    $('#hints').append($i);
  }

  function addTreasure(e){
    var lat = $('input[data-loc=lat]').val();

    if(!lat){
      var name = $('input[data-loc=name]').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results,status){
      var name = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();

      $('input[data-loc=name]').val(name);
      $('input[data-loc=lat]').val(lat);
      $('input[data-loc=lng]').val(lng);

      $('form').submit();
    });
  }
})();

