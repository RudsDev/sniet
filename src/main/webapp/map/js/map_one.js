var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


function initMap() {

	var lati=0, long=0, aux=0;
	
	var id = getUrlParameter('individuoID');
	
	$.ajax({	
		url: '/sniet/servlet/incidents/'+id,
		//url: 'http://localhost:8282/sniet/servlet/incidents/'+id,
		type: 'GET',
		crossDomain: true,
		contentType: 'text/plain; charset=utf-8',
		dataType: 'text',
		async: true,

		success: function (JsonData) {

			var json = JSON.parse(JsonData);

			var incidente = json;
			var local = incidente['local'];

			lati = lati + local.latitude;
			long = long + local.longitude;
			aux++;

			var contentString = '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h1 id="firstHeading" class="firstHeading">Rio de Janeiro</h1>' +
			'<div id="bodyContent">' +
			'<p>' + incidente.descIncidente + '</p>' +
			'<p>Attribution: Tubarões!<br>' +
			'Liderados por Daniel Silos ' +
			'(last visited June 18, 2017).</p>' +
			'</div>' +
			'</div>';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			var marker = new google.maps.Marker({
				position: { lat: local.latitude, lng: local.longitude },
				map: map,
				title: local.nomeLocal
			});

			marker.addListener('click', function () {
				infowindow.open(map, marker);
			});

			lati  = lati/aux; var asd = lati.toString();
			long  = long/aux;
			
		}
	});

	var local = { lat: -22.951695, lng: -43.2108 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: local,
	});
}