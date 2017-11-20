function initMap() {

	var lati=0, long=0, aux=0;

	$.ajax({
		url: '/sniet/servlet/incidents/full',
		//url: 'http://localhost:8282/sniet/servlet/incidents/full',
		type: 'GET',
		crossDomain: true,
		contentType: 'text/plain; charset=utf-8',
		dataType: 'text',
		async: true,

		success: function (JsonData) {
			//console.log("Success!!!");
			var json = JSON.parse(JsonData);

			for (var index in json){

				var incidente = json[index].incidente;
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

			}

			lati  = lati/aux; var asd = lati.toString();
			long  = long/aux;

			//console.log(asd);
			//console.log(long);
		}
	});

	var local = { lat: -22.951695, lng: -43.2108 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: local,
	});


}