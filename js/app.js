//function initialize() {
//	var mapCanvas = document.getElementById('map');
//	var mapOptions = {
//		
//		center: new google.maps.LatLng(21.3286303, 39.9535998),
//		zoom: 16,
//		mapTypeId: google.maps.MapTypeId.ROADMAP
//	}
//	var map = new google.maps.Map(mapCanvas, mapOptions)
//}
//google.maps.event.addDomListener(window, 'load', initialize);

function initMap() {
  var myLatLng = {lat: 21.3286303, lng: 39.9535998};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 16
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'GISTIC!',
	 
  });
}
google.maps.event.addDomListener(window, 'load', initMap);