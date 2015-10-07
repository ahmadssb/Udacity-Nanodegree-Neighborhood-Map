// globals
var marker, i, infowindow, map, contentString;

// center map
var centerLatLng = {
	lat: 21.3286303,
	lng: 39.9535998
};

// markers data
var tempData = [];
var placesData = [
	{
		name: 'BGISTIC0',
		desc: 'description about GISTIC0',
		address: 'address GISTIC0',
		link: 'http://www.gistic.org',
		lat: 21.3286303,
		lng: 39.9535998
	},
	{
		name: 'BGISTIC1',
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

var Places = function (data) {
	this.name = ko.observable(data.name);
	this.desc = ko.observable(data.desc);
	this.address = ko.observable(data.address);
	this.link = ko.observable(data.link);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
};

var ViewModel = {
	searchBar: ko.observable(''),
	placeList: ko.observableArray(placesData),

	init: function () {
		var self = this;
		//this.placeList = ko.observableArray(placesData);
		console.log(ViewModel.placeList());
	},

	query: ko.observable(''),

	search: function (value) {
		//ViewModel.placeList.removeAll();
		if (value === '') {
			ViewModel.removeMarker();
			console.log('Empty Value return placeData');
			ViewModel.placeList(placesData);
			console.log('ViewModel.placeList()');
			console.log(ViewModel.placeList());
			ViewModel.clearMarkers();
			ViewModel.addMarkerSet(ViewModel.markers());
			console.log('ViewModel.markers()');
			console.log(ViewModel.markers());
		} else {
			ViewModel.placeList(tempData);
			ViewModel.placeList.removeAll();
			console.log('Before Remove ViewModel.markers()');
			console.log(ViewModel.markers());
			ViewModel.removeMarker();
			console.log('After Remove ViewModel.markers()');
			console.log(ViewModel.markers());
			console.log('Not Empty Value return founded data');
			for (var x in placesData) {
				if (placesData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					ViewModel.placeList.push(placesData[x]);
					console.log('Before Add ViewModel.addMarkerSet()');
					console.log(ViewModel.placeList());
					//ViewModel.addMarker(ViewModel.addMarkerSet(ViewModel.placeList()));
					console.log('AfViewModel.markers()');
					console.log(ViewModel.markers());
					//ViewModel.renderMarkers(map);
					//ViewModel.addMarker(ViewModel.markers()[x].lat, ViewModel.markers()[x].lng);
				}
			}
		}

	},
	setCurrentPlace: function () {

	},

	contentString: function (currentMarkerI) {
		return '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h4 id="firstHeading" class="firstHeading">' + ViewModel.placeList()[currentMarkerI].name + '</h4>' +
			'<div id="bodyContent">' +
			'<h6>' + ViewModel.placeList()[currentMarkerI].desc + '</h6>' +
			'<p>' + ViewModel.placeList()[currentMarkerI].address + '</p>' +
			'<p>Website: <a href="' + ViewModel.placeList()[currentMarkerI].link + '" target="_blank">' + ViewModel.placeList()[currentMarkerI].link + '</a> </p>' +
			'</div>' +
			'</div>';
	},


	renderMarkers: function (map) {
		var infowindow = new google.maps.InfoWindow();

		// Display markers from markerData
		for (i = 0; i < ViewModel.placeList().length; i++) {
			// setup marker position and animation
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(ViewModel.placeList()[i].lat, ViewModel.placeList()[i].lng),
				map: map,
				animation: google.maps.Animation.DROP
			});

			// getting the the current (i) when the user click on marker 
			google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
				return function () {
					// setup content tamplate 
					var contentString = ViewModel.contentString(currentMarkerI);
					infowindow.setContent(contentString);
					infowindow.open(map, marker);
				};
			})(marker, i));
		}
	},

	markers: ko.observableArray([]),

	initMap: function () {
		map = new google.maps.Map(document.getElementById('map'), {
			center: centerLatLng,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 16
		});
		//ViewModel.renderMarkers(map);
		ViewModel.addMarkerSet(ViewModel.markers());
		console.log('markers');
		console.log(ViewModel.markers());

	},

	addMarker: function (lat, lng) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			animation: google.maps.Animation.DROP
		});
		//		for (i = 0; i < ViewModel.markers().length; i++) {
		//			// getting the the current (i) when the user click on marker 
		//			google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
		//				return function () {
		//					// setup content tamplate 
		//					var contentString = ViewModel.contentString(currentMarkerI);
		//					infowindow.setContent(contentString);
		//					infowindow.open(map, marker);
		//				};
		//			})(marker, i));
		//		}
		ViewModel.displayMarker();
		ViewModel.markers.push(marker);
	},

	addMarkerSet: function (markerSetArray) {
		for (i = 0; i < ViewModel.placeList().length; i++) {
			ViewModel.addMarker(ViewModel.placeList()[i].lat, ViewModel.placeList()[i].lng);
		}

	},

	setMarker: function (map) {
		for (var i = 0; i < ViewModel.markers().length; i++) {
			ViewModel.markers()[i].setMap(map);
		}
	},

	removeMarker: function () {
		ViewModel.clearMarkers();
		ViewModel.markers = ko.observableArray([]);
	},

	displayMarker: function () {
		for (i = 0; i < ViewModel.markers().length; i++) {
			ViewModel.setMarker(map);
			// getting the the current (i) when the user click on marker 
			var infowindow = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', (function (marker, currentMarkerI) {
				return function () {
					// setup content tamplate 
					var contentString = ViewModel.contentString(currentMarkerI);
					infowindow.setContent(contentString);
					infowindow.open(map, marker);
				};
			})(marker, i));
		}
	},

	clearMarkers: function () {
		ViewModel.setMarker(null);
	},
};

ViewModel.query.subscribe(ViewModel.search);

ko.applyBindings(ViewModel);
