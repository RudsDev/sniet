
var mapa;

function initMap() {
	var local = { lat: -22.951695, lng: -43.2108 };

	mapa = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: local,
	});
}

function carregarPontosLatLong(incidentes) {

	var pontos = [];

	$.each(incidentes, function (index, incidente) {

		var local = incidente.local;

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(local.latitude, local.longitude),
			title: local.nomeLocal,
			map: mapa
		});

		var infowindow = new google.maps.InfoWindow({
			content: incidente.descIncidente,
		});

		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});
	});
}