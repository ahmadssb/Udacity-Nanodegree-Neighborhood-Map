// globals
var marker, i, map, contentString;
var infowindow = null;

// center map
var centerLatLng = {
	lat: 21.3989712,
	lng: 39.8004776
};

// markers data
var tempData = [];
var foursquareData = []
var placesData = [
	{
		name: 'BGISTIC0',
		desc: 'description about GISTIC0',
		address: 'address GISTIC0',
		link: 'http://www.gistic.org',
		lat: 21.3286303,
		lng: 39.9535998,
		marker: {}
	},
	{
		name: 'BGISTIC1',
		desc: 'description about GISTIC1',
		address: 'address GISTIC1',
		link: 'http://www.gistic.org',
		lat: 21.330729,
		lng: 39.954801,
		marker: {}
	},
	{
		name: 'GISTIC2',
		desc: 'description about GISTIC2',
		address: 'address GISTIC2',
		link: 'http://www.gistic.org',
		lat: 21.328651,
		lng: 39.953869,
		marker: {}
	},
	{
		name: 'GISTIC3',
		desc: 'description about GISTIC3',
		address: 'address GISTIC3',
		link: 'http://www.gistic.org',
		lat: 21.3291708,
		lng: 39.9482042,
		marker: {}
	}];

var foursquareBaseUri = "https://api.foursquare.com/v2/venues/search?";
var foursquareClientId = "012U2GL5VVR52WLULMSOXOODKHJW3C53OBTI5ZA4KAYU5BG1";
var foursquareClientSecret = "43A2ZPGGC1KSP1QMVHT2CDRTD2RCLGCITNIVI5Q1HCNBJK1P";
var centerLocation = centerLatLng.lat + "," + centerLatLng.lng;
var limit = 20;
var extraParams = "&limit=" + limit + "&query=restaurant";
var foursquareURL = foursquareBaseUri + "client_id=" + foursquareClientId + "&client_secret=" + foursquareClientSecret + "&v=20130815" + "&ll=" + centerLocation + extraParams;

var ViewModel = {
	searchBar: ko.observable(''),
	placeList: ko.observableArray(placesData),

	foursquareList: ko.observableArray(foursquareData),

	foursquare: function () {
		console.log(ViewModel.foursquareList());

		$.getJSON(foursquareURL, function (data) {
			console.log(data.response.venues.length);
			var venues = data.response.venues;
			for (var i in data.response.venues) {
				var myData = {
						name: venues[i].name,
						address: venues[i].location.country ,
						lat: venues[i].location.lat ,
						lng: venues[i].location.lng,
						marker: {}
					}
				ViewModel.foursquareList.push(myData);
			}
			console.log(ViewModel.foursquareList());
			ViewModel.initMap();
		});
		console.log(ViewModel.foursquareList());
	},

	setCurrentPlace: function (placeId) {
		//ViewModel.currenPlace(placeId.toString());
		console.log("currenPlace: " + placeId.name);
		console.log("currenPlace: " + placeId.marker);
		var index = jQuery(ViewModel.foursquareList()).index(placeId);
		console.log("index: " + index);
		ViewModel.selectedPlace(index);
	},

	query: ko.observable(''),

	search: function (value) {
		if (value === '') {
			ViewModel.clearMarkers();
			console.log('Empty Value return placeData');
			ViewModel.foursquareList(foursquareData);
			console.log('ViewModel.placeList()');
			console.log(ViewModel.foursquareList());
			ViewModel.clearMarkers();
			ViewModel.addMarkerSet(ViewModel.markers());
			console.log('ViewModel.markers()');
			console.log(ViewModel.markers());
		} else {
			ViewModel.foursquareList(tempData);
			ViewModel.foursquareList.removeAll();
			console.log('Before Remove ViewModel.markers()');
			console.log(ViewModel.markers());
			ViewModel.clearMarkers();
			console.log('After Remove ViewModel.markers()');
			console.log(ViewModel.markers());
			console.log('Not Empty Value return founded data');
			for (var x in foursquareData) {
				if (foursquareData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					ViewModel.foursquareList.push(foursquareData[x]);
				}
			}
			console.log('Before Add ViewModel.addMarkerSet()');
			console.log(ViewModel.markers());
			ViewModel.addMarkerSet(ViewModel.foursquareList());
			ViewModel.displayMarker();
			console.log('After add ViewModel.markers()');
			console.log(ViewModel.markers());
		}
	},

	contentString: function (currentMarkerI) {
		return '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h4 id="firstHeading" class="firstHeading">' + ViewModel.foursquareList()[currentMarkerI].name + '</h4>' +
			'<div id="bodyContent">' +
			// '<h6>' + ViewModel.placeList()[currentMarkerI].desc + '</h6>' +
			'<p>' + ViewModel.foursquareList()[currentMarkerI].address + '</p>' +
			// '<p>Website: <a href="' + ViewModel.placeList()[currentMarkerI].link + '" target="_blank">' + ViewModel.placeList()[currentMarkerI].link + '</a> </p>' +
			'</div>' +
			'</div>';
	},

	markers: ko.observableArray([]),

	// To Open infoWindow for the selected place
	selectedPlace: function (id) {
		if (infowindow) {
			infowindow.close();
		}
		infowindow = new google.maps.InfoWindow();
		contentString = ViewModel.contentString(id);
		infowindow.setContent(contentString);
		console.log("selectedPlaceInfoWind: " + ViewModel.foursquareList()[id].marker);
		infowindow.open(map, ViewModel.foursquareList()[id].marker);
	},

	initMap: function () {
		//ViewModel.foursquare();
		map = new google.maps.Map(document.getElementById('map'), {
			center: centerLatLng,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 11
		});
		ViewModel.addMarkerSet(ViewModel.markers());
		console.log('markers');
		//console.log(ViewModel.markers());
		//console.log(ViewModel.foursquare());
		//console.log(ViewModel.foursquareList());

	},

	addMarker: function (lat, lng, i) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			animation: google.maps.Animation.DROP
		});
		ViewModel.displayMarker();
		ViewModel.markers.push(marker);
		ViewModel.foursquareList()[i].marker = marker;
//		console.log("placeList()[i].marker" + ViewModel.foursquareList()[i].marker);
//		console.log("marker" + marker);
//		if (marker === ViewModel.foursquareList()[i].marker) {
//			console.log(true);
//		} else {
//			console.log(false);
//		}
		if (infowindow) {
			infowindow.close();
		}

		// getting the the current (i) when the user click on marker 
		infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
			return function () {
				// setup content tamplate 
				contentString = ViewModel.contentString(currentMarkerI, marker);
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
//				if (marker === ViewModel.foursquareList()[i].marker) {
//					console.log("Compare marker === foursquareList.marker");
//					console.log(true);
//				} else {
//					console.log(false);
//				}
				console.log("selectedPlaceInfoWind: " + ViewModel.foursquareList()[currentMarkerI].marker);

			};
		})(marker, i));
	},

	addMarkerSet: function (markerSetArray) {
		for (i = 0; i < ViewModel.foursquareList().length; i++) {
			ViewModel.addMarker(ViewModel.foursquareList()[i].lat, ViewModel.foursquareList()[i].lng, i);
		}
	},

	setMarker: function (map) {
		for (var i = 0; i < ViewModel.markers().length; i++) {
			ViewModel.markers()[i].setMap(map);
		}
	},

	displayMarker: function () {
		for (i = 0; i < ViewModel.markers().length; i++) {
			ViewModel.setMarker(map);
		}
	},

	clearMarkers: function () {
		for (i = 0; i < ViewModel.markers().length; i++) {
			ViewModel.setMarker(null);
		}
		ViewModel.markers = ko.observableArray([]);
	},
};

ViewModel.query.subscribe(ViewModel.search);

ko.applyBindings(ViewModel);
