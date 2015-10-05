function initMap() {
	'use strict';
	// center map
	var centerLatLng = {
		lat: 21.3286303,
		lng: 39.9535998
	};

	// markers data
	var markersData = [
		{
			name: 'GISTIC0',
			desc: 'description about GISTIC0',
			address: 'address GISTIC0',
			link: 'http://www.gistic.org',
			lat: 21.3286303,
			lng: 39.9535998
		},
		{
			name: 'GISTIC1',
			desc: 'description about GISTIC1',
			address: 'address GISTIC1',
			link: 'http://www.gistic.org',
			lat: 21.330729,
			lng: 39.954801
		},
		{
			name: 'GISTIC2',
			desc: 'description about GISTIC2',
			address: 'address GISTIC2',
			link: 'http://www.gistic.org',
			lat: 21.328651,
			lng: 39.953869
		},
		{
			name: 'GISTIC3',
			desc: 'description about GISTIC3',
			address: 'address GISTIC3',
			link: 'http://www.gistic.org',
			lat: 21.3291708,
			lng: 39.9482042
		}];

	// globals
	var infowindow = new google.maps.InfoWindow();
	var marker, i;

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 16
	});

	// Display markers from markerData
	for (i = 0; i < markersData.length; i++) {
		// setup marker position and animation
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(markersData[i].lat, markersData[i].lng),
			map: map,
			animation: google.maps.Animation.DROP
		});

		// getting the the current (i) when the user click on marker 
		google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
			return function () {
				// setup content tamplate 
				var contentString = '<div id="content">' +
					'<div id="siteNotice">' +
					'</div>' +
					'<h4 id="firstHeading" class="firstHeading">' + markersData[currentMarkerI].name + '</h4>' +
					'<div id="bodyContent">' +
					'<h6>' + markersData[currentMarkerI].desc + '</h6>' +
					'<p>' + markersData[currentMarkerI].address + '</p>' +
					'<p>Website: <a href="' + markersData[currentMarkerI].link + '" target="_blank">' + markersData[currentMarkerI].link + '</a> </p>' +
					'</div>' +
					'</div>';
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			};
		})(marker, i));
	}
}
