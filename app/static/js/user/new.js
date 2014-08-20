/* global google:true */

(function(){
  'use strict';
  var i = 1;

  $(document).ready(function(){
    $('form').submit(addTreasure);
    $('#addHint').click(addHint);
  });

  function addHint(){
    var $input = "<input type='test' class='form-control' name='hints'["+(i++)+"]'>";
    $('#hints').append($input);
  }

  function addTreasure(e){
    var lat = $('#locLat').val();

    if(!lat){
      var name = $('#locName').val();
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

      $('#locName').val(name);
      $('#locLat').val(lat);
      $('#locLng').val(lng);

      $('form').submit();
    });
  }
})();

