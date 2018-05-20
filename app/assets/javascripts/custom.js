
$(document).ready(function(){
searchLocation()
})

function searchLocation(){
$("#searchLocation").on('click',function() {
    $(this).trigger("geocode");
    var options = {
      map: "#map_canvas",
      location: 'India'
     // mapOptions: {
     //  streetViewControl: false,
     //  mapTypeId : google.maps.MapTypeId.HYBRID
     // },
      //markerOptions: {
       // draggable: true
      //}
    };
	$('#searchLocation').geocomplete().bind("geocode:result", function(event, result){
      var map = $(this).geocomplete("map");
      $("#latitude").val(result.geometry.location.lat());
      $("#longitude").val(result.geometry.location.lng());
    });
});
}