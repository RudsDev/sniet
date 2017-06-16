

$(document).ready(function () {

	$('#command').on('click', function () {

		var incidenteWrapper = {
			incidente: {
				descIncidente: $('#descricao').val(),
				dataIncidente: $('#data').val(),
				status: $('#status_incidente').val(),
				local: {
					nomeLocal: $('#name_local').val(),
					pais: $('#pais').val(),
					uf: $('#uf').val(),
					cidade: $('#cidade').val(),
					bairro: $('#bairro').val(),
					latitude: $('#latitude').val(),
					longitude: $('#longitude').val(),
				},
			},
			individuo: {
				idade: $('#idade').val(),
				nome: $('#name').val(),
				profissao: $('#profissao').val(),
				sex: $('#sex').val(),
				pratica: {
					tipoPratica: $('#tipo_pratica').val(),
					statusPratica: $('#status_pratica').val(),
					descPratica: $('#desc_pratica').val()
				}
			}
		};

		$.ajax({
			url: 'http://localhost:8282/sniet_api/servlet/incidentes/',


			//ip aws
			//url:'http://52.14.130.196/
			//data: JSON.stringify({user:userModel, instituicao:instituicaoModel}),
			data: JSON.stringify(incidenteWrapper),
			type: 'POST',
			crossDomain: true,
			contentType: 'application/json; charset=utf-8',
			async: true,
			success: function (data, textStatus, jqXHR) {
				console.log('Success!!!');
				console.log(data);
				console.log(jqXHR);
				console.log(jqXHR.getResponseHeader('Location'));
				console.log(jqXHR.getAllResponseHeaders());
				console.log(jqXHR.always());
				console.log(textStatus)
				console.log(jqXHR.always().getResponseHeader('Location'));
				console.log(jqXHR.always().getAllResponseHeaders());
				console.log('-------------------------------------------');
			},
			complete: function (jqXHR, textStatus) {
				console.log('Complete!!!');
				console.log(jqXHR);
				console.log(jqXHR.getResponseHeader('Location'));
				console.log(jqXHR.getAllResponseHeaders());
				console.log(jqXHR.always());
				console.log(textStatus)
				console.log(jqXHR.always().getResponseHeader('Location'));
				//console.log(textStatus);
				/*for (var prop in JsonData) {
					console.log(JsonData[prop]);
				}*/
				console.log('-------------------------------------------');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('Failed!');
				//console.log(jqXHR);
				//console.log(textStatus);
				console.log(errorThrown);
				console.log('-------------------------------------------');
			},
		});

	});






	var pesquisaNomeLocal = function () {


		var nomeLocal = $('#name_local').val();

		$.ajax({
			url: 'http://localhost:8282/apirestex/servlet/incidente/local' + nomeLocal,

			//ip aws
			//url:'http://52.14.130.196/
			//data: JSON.stringify({user:userModel, instituicao:instituicaoModel}),
			data: JSON.stringify(user),
			type: 'GET',
			crossDomain: true,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			async: true,
			success: function (JsonData) {
				console.log("Success!!!");
				for (var prop in JsonData) {
					console.log(JsonData[prop]);
				}
			},
			error: function () { console.log(); ('Failed!'); },
		});

	}

});
