

$(document).ready(function () {

	$('#command').on('click', function () {

		var local = {
			nomeLocal: $('#name_local').val(),
			pais: $('#pais').val(),
			uf: $('#uf').val(),
			cidade: $('#cidade').val(),
			bairro: $('#bairro').val(),
			latitude: $('#latitude').val(),
			longitude: $('#longitude').val(),
		};
		pesquisaNomeLocal();
	});


	$('#buscar-full').on('click', function () {

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/incidentes/full',
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);

				var incidentesArray = [];

				for (var index in json)
					incidentesArray.push(json[index].incidente);

				carregarPontosLatLong(incidentesArray);
			},
			error: function () { console.log('Failed!'); },
		});
	});


	var pesquisaNomeLocal = function () {

		var nomeLocal = $('#name_local').val();

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/incidentes/local/' + nomeLocal,
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'json',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				carregarPontosLatLong(JsonData);
			},
			error: function () { console.log('Failed!'); },
		});
	}
});