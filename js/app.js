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
	'use strict';
	var myLatLng = {
		lat: 21.3286303,
		lng: 39.9535998
	};

	var neighborhoods = [
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

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 16

	});



	var infowindow = new google.maps.InfoWindow();

	var marker, i;
	for (i = 0; i < neighborhoods.length; i++) {

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(neighborhoods[i].lat, neighborhoods[i].lng),
			map: map,
			animation: google.maps.Animation.DROP

		});


		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {

				var contentString = '<div id="content">' +
					'<div id="siteNotice">' +
					'</div>' +
					'<h4 id="firstHeading" class="firstHeading">'+ neighborhoods[i].name +'</h4>' +
					'<div id="bodyContent">' +
					'<h6>'+neighborhoods[i].desc+'</h6>' +
					'<p>'+neighborhoods[i].address+'</p>' +
					'<p>Website: <a href="' + neighborhoods[i].link+ '" target="_blank">' + neighborhoods[i].link + '</a> </p>' +
					'</div>' +
					'</div>';
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}

}
