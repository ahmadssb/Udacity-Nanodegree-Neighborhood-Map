// globals
var marker, i, map, contentString;
var infowindow = null;

// center map
var centerLatLng = {
	lat: 21.408241,
	lng: 39.809061
};

// Search data
var tempData = [];
// final foursquare JSON Data
var foursquareData = []

// setup Foursquare Link
var foursquareBaseUri = "https://api.foursquare.com/v2/venues/search?";
var foursquareClientId = "012U2GL5VVR52WLULMSOXOODKHJW3C53OBTI5ZA4KAYU5BG1";
var foursquareClientSecret = "43A2ZPGGC1KSP1QMVHT2CDRTD2RCLGCITNIVI5Q1HCNBJK1P";
var centerLocation = centerLatLng.lat + "," + centerLatLng.lng;
var limit = 15;
var extraParams = "&limit=" + limit + "&query=restaurant";
var foursquareURL = foursquareBaseUri + "client_id=" + foursquareClientId + "&client_secret=" + foursquareClientSecret + "&v=20130815" + "&ll=" + centerLocation + extraParams;

var ViewModel = {
	foursquareList: ko.observableArray(foursquareData),
	/*
	* Load Foursquare API and save whatever JSON Elements we need to foursquareData[]
	*/
	foursquare: function () {
		$.getJSON(foursquareURL, function (data) {
			var venues = data.response.venues;
			for (var i in data.response.venues) {
				// setup a tamplate of what data I need foursquare API response
				var myData = {
						name: venues[i].name,
						address: venues[i].location.country ,
						lat: venues[i].location.lat ,
						lng: venues[i].location.lng,
						marker: {}
					}
				// push the new object to foursquareList (which will update foursquareData[])
				ViewModel.foursquareList.push(myData);
			}
			// initiate Google Maps
			ViewModel.initMap();
		});
	},
	
	setCurrentPlace: function (placeId) {
		var index = $(ViewModel.foursquareList()).index(placeId);
		ViewModel.selectedPlace(index);
	},

	query: ko.observable(''),

	search: function (value) {
		// when value is embty
		if (value === '') {
			/*
			* returun Original foursquareList markers
			*/
			ViewModel.foursquareList(foursquareData);
			ViewModel.clearMarkers();
			ViewModel.addMarkerSet(ViewModel.markers());
		} else {
			/*
			*  set foursquareList to tempData and remove all current data and markers
			*/
			ViewModel.foursquareList(tempData);
			ViewModel.foursquareList.removeAll();
			ViewModel.clearMarkers();
			// loop through foursquareData
			for (var x in foursquareData) {
				// find the charachter at index [x] of name and compare it with value input
				if (foursquareData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					// add the current index [x] of foursquareData to tempData List (through the new foursquareList array)
					ViewModel.foursquareList.push(foursquareData[x]);
				}
			}
			// update markers to the new set of places inside foursquareList()
			ViewModel.addMarkerSet(ViewModel.foursquareList());
			// display the markers
			ViewModel.displayMarker();
		}
	},

	// prepare the content of marker infoWindow
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

	// an array of markers
	markers: ko.observableArray([]),

	// To Open infoWindow for the selected place
	selectedPlace: function (index) {
		// to close all opened infowindow
		if (infowindow) {
			infowindow.close();
		}
		infowindow = new google.maps.InfoWindow();
		// the content of selected place (index)
		contentString = ViewModel.contentString(index);
		infowindow.setContent(contentString);
		infowindow.open(map, ViewModel.foursquareList()[index].marker);
	},

	// Initiate Google Maps 
	initMap: function () {
		// setup map Parameters 
		map = new google.maps.Map(document.getElementById('map'), {
			center: centerLatLng,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 14
		});
		// Load google markers 
		ViewModel.addMarkerSet(ViewModel.markers());
	},

	// setup each marker to its lat and lng and its infowindow content
	addMarker: function (lat, lng, i) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			animation: google.maps.Animation.DROP
		});
		ViewModel.displayMarker();
		ViewModel.markers.push(marker);
		// make a reference of marker inside the current foursquareList()[i].marker
		ViewModel.foursquareList()[i].marker = marker;

		// getting the the current (i) when the user click on marker 
		infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
			return function () {
				// setup content tamplate 
				contentString = ViewModel.contentString(currentMarkerI, marker);
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			};
		})(marker, i));
	},

	// add new marker based on foursquareList() lat and lng 
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
