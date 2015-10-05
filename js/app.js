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
	
var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">KACST GIS Technology Innovation Center </h2>'+
      '<div id="bodyContent">'+
      '<p>Al Awali, Mecca 24381 </p>'+
      '<p>Website: <a href="http://www.gistic.org" target="_blank">'+
      'http://www.gistic.org</a> </p>'+
      '</div>'+
      '</div>';
	
 var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'GISTIC!',
	 
  });
	
	
 marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
 

}
google.maps.event.addDomListener(window, 'load', initMap);