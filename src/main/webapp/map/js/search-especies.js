
$(document).ready(function () {

	$('#tbl-especies').hide();

	$('#buscar-id').on('click', function () {

		var id = $('#search-id').val();

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/especies/' + id,
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaEspecies(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

	});


	$('#buscar-cientifico').on('click', function () {

		var nomeCientifico = $('#search-cientifico').val();

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/especies/cientifico/' + nomeCientifico,
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaEspecies(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

	});


	$('#buscar-all').on('click', function () {

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/especies/',
			type: 'GET',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				criaTabelaEspecies(json);
			},
			error: function () { console.log(); ('Failed!'); },
		});

	});



	function criaTabelaEspecies(especies) {

		console.log(especies);

		var trEspecies = "";


		if (Array.isArray(especies)) {



			for (var especie in especies) {

				console.log(especies[especie]);

				console.log(especies[especie].idEspecie);

				trEspecies +=
					"<!-- especies -->" +
					"<tr>" +
					"<td id='id'>" + especies[especie].idEspecie + "</td>" +
					"<td class='name-cientifico'>" + especies[especie].nomeCientifico + "</td>" +
					"<td class='descricao'>" + especies[especie].descricao + "</td>" +
					"<td class='tam-medio'>" + especies[especie].tamMedio + "</td>" +
					"</tr>" +
					"<!-- especies -->";
			}
		}
		else {
			trEspecies =
				"<!-- especies -->" +
				"<tr>" +
				"<td id='id'>" + especies.idEspecie + "</td>" +
				"<td class='name-cientifico'>" + especies.nomeCientifico + "</td>" +
				"<td class='descricao'>" + especies.descricao + "</td>" +
				"<td class='tam-medio'>" + especies.tamMedio + "</td>" +
				"</tr>" +
				"<!-- especies -->";
		}



		$('#tbl-especies').show();
		$('#tbl-especies-body').empty().append(trEspecies);

	}

});