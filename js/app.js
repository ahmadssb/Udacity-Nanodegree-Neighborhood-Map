// globals
var marker, i, infowindow;

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
			console.log('Empty Value return placeData');
			ViewModel.placeList(placesData);
			console.log(ViewModel.placeList());
			console.log(placesData);
			
		} else {
			ViewModel.placeList(tempData);
			ViewModel.placeList.removeAll();
			console.log('Not Empty Value return founded data');
			for (var x in placesData) {
		   //ViewModel.placeList().visible=false;
			if (placesData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				ViewModel.placeList.push(placesData[x]);
				//placesData[x].visibile= true;
			}
		}
		}
		
	},
	setCurrentPlace: function () {

	}
	
	
};

ViewModel.query.subscribe(ViewModel.search);

ko.applyBindings(ViewModel);


function initMap() {
	'use strict';
	infowindow = new google.maps.InfoWindow();

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 16
	});

	// Display markers from markerData
	for (i = 0; i < placesData.length; i++) {
		// setup marker position and animation
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(placesData[i].lat, placesData[i].lng),
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
					'<h4 id="firstHeading" class="firstHeading">' + placesData[currentMarkerI].name + '</h4>' +
					'<div id="bodyContent">' +
					'<h6>' + placesData[currentMarkerI].desc + '</h6>' +
					'<p>' + placesData[currentMarkerI].address + '</p>' +
					'<p>Website: <a href="' + placesData[currentMarkerI].link + '" target="_blank">' + placesData[currentMarkerI].link + '</a> </p>' +
					'</div>' +
					'</div>';
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			};
		})(marker, i));
	}
}
