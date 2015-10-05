function initialize() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		
		center: new google.maps.LatLng(21.3286303, 39.9535998),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions)
}
google.maps.event.addDomListener(window, 'load', initialize);
