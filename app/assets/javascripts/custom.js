
$(document).ready(function(){
  searchLocation()
  togglemap()
  if($('#map-canvas').length > 0){
    initialize()
  }
})

function searchLocation(){
$("#searchLocation").on('click',function() {
    $(this).trigger("geocode");
    var options = {
      location: 'India'
    };
	$('#searchLocation').geocomplete().bind("geocode:result", function(event, result){
    //var map = $(this).geocomplete("map");
    $("#latitude").val(result.geometry.location.lat());
    $("#longitude").val(result.geometry.location.lng());
  });   
});

}


function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(45);            

    var markers=[];
    var infoWindowContent=[];
    $.each(nearbys, function(index) { 
        markers.push(['abc', nearbys[index]['latitude'],nearbys[index]['longitude']]);
        infoWindowContent.push(['<div class="info_content" >' +
        '<h3 style="color: green"><a href="'+window.location.origin+'/houses/'+nearbys[index]['id']+'">'+nearbys[index]['title']+'</a></h3>' +'</br>'+
        '<p>'+'info'+'</p>' +       
         '</div>']);

        });   

       // Display multiple markers on a map
       var infoWindow = new google.maps.InfoWindow(), marker, i;        
      // Loop through our array of markers & place each one on the map  
      for( i = 0; i < markers.length; i++ ) {
          var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
          bounds.extend(position);
          marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);


            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);

    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(8);
        google.maps.event.removeListener(boundsListener);
    });

}//initialize ends
function togglemap(){
 $('.property_list_view').click(function(){
    $('#list_view').removeClass('hide');
     $('#map-canvas').addClass('hide');
  })
  $('.property_map_view').click( function(){
    $('#list_view').addClass('hide');
     $('#map-canvas').removeClass('hide');
    
  })

}
