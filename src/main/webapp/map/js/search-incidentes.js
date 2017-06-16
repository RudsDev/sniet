
$(document).ready(function () {

	$('#tbl-incidentes').hide();

	$('#buscar-id').on('click', function () {

		var id = $('#search-id').val();

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/incidentes/' + id,
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaIncidentes(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

	});


    /*$('#buscar-periodo').on('click', function(){

		var nomeCientifico = $('#search-cientifico').val();
 
	  $.ajax({
			url:'http://localhost:8282/sniet_api/servlet/incidentes/datainicial/'+{dataInicial}+'/datainicial/'+{dataFinal},
			type:'GET',
			crossDomain: true,
	    	contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async:true,
			success: function(JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaIncidentes(json);
			},
			error: function() { console.log();('Failed!'); },
	  });

	});*/


	$('#buscar-all').on('click', function () {

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/incidentes/',
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaIncidentes(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

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
				criaTabelaIncidentesIndividuos(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

	});



	function criaTabelaIncidentes(incidentes) {

		console.log(incidentes);

		var trIncidentes = "";


		if (Array.isArray(incidentes)) {



			for (var incidente in incidentes) {

				console.log(incidentes[incidente]);

				console.log(incidentes[incidente].idIncidente);

				trIncidentes +=
					"<!-- incidentes -->" +
					"<tr>" +
					"<td id='id'>" + incidentes[incidente].idIncidente + "</td>" +
					"<td class='status'>" + incidentes[incidente].status + "</td>" +
					"<td class='descricao'>" + incidentes[incidente].descIncidente + "</td>" +
					"</tr>" +
					"<!-- incidentes -->";
			}
		}
		else {
			trIncidentes =
				"<!-- incidentes -->" +
				"<tr>" +
				"<td id='id'>" + incidentes.idIncidente + "</td>" +
				"<td class='status'>" + incidentes.status + "</td>" +
				"<td class='descricao'>" + incidentes.descIncidente + "</td>" +
				"</tr>" +
				"<!-- incidentes -->";
		}



		$('#tbl-incidentes').show();
		$('#tbl-incidentes-body').empty().append(trIncidentes);

	}


	function criaTabelaIncidentesIndividuos(individuos) {



		var trIncidentes = "";


		if (Array.isArray(individuos)) {

			console.log('É um array');

			console.log(individuos[0]);

			for (var index in individuos) {

				var individuo = individuos[index];
				var pratica = individuo['pratica'];

				var incidente = individuo['incidente'];
				var local = incidente['local'];


				trIncidentes +=
					"<!-- incidentes -->" +
					"<tr>" +
					"<td id='id'>" + incidente.idIncidente + "</td>" +
					"<td class='status'>" + incidente.status + "</td>" +
					"<td class='descricao_incidente'>" + incidente.descIncidente + "</td>" +
					"<td id='nome_individuo'>" + individuo.nome + "</td>" +
					"<td class='descricao_pratica'>" + pratica.descPratica + "</td>" +
					"<td class='nome_local'>" + local.nomeLocal + "</td>"
				"</tr>" +
					"<!-- incidentes -->";
			}
		}
		else {

			console.log('Não é um array');

            /*trIncidentes	=
                    "<!-- incidentes -->" +
                        "<tr>" +
                            "<td id='id'>" + incidentes.idIncidente + "</td>" +
                            "<td class='status'>" + incidentes.status + "</td>" +
                            "<td class='descricao'>" + incidentes.descIncidente + "</td>" +
                        "</tr>" +
                    "<!-- incidentes -->";*/
		}



		$('#tbl-incidentes').show();
		$('#tbl-incidentes-body').empty().append(trIncidentes);

	}

});