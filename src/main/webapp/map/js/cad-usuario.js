

$(document).ready(function (){

	var user = localStorage.getItem('user');

	console.log(user);

	if(user!=undefined){

		for (var param in user)
			console.log(user[param]);
		

		$('#name').text(user.name);
		$('#secondName').val(user.secondName);
		$('#sex').val(user.sex);
		$('#acessLevel').val(user.acessLevel);
		$('#status').val(user.status);
		$('#email').val(user.email);
		$('#telefone').val(user.telefone);
		$('#login').val(user.login);
	  }



	$('#command').on('click', function(){

	  var user = {
			name: $('#name').val(),
			secondName: $('#secondName').val(),
			sex: $('#sex').val(),
			acessLevel: $('#acessLevel').val(),
			status: $('#status').val(),
			email: $('#email').val(),
			telefone: $('#telefone').val(),
			login: $('#login').val(),
			password: $('#password').val(),
			instituicao: {
				nome: $('#instituicao').val(),
				registro: $('#registro_inst').val(),
				tipoInstituicao:$('#tipo_instituicao').val(),
				endereco:{
					pais: $('#pais_inst').val(),
					uf: $('#uf_inst').val(),
					cidade: $('#cidade_inst').val(),
					bairro: $('#bairro_inst').val(),
					tipoLogradouro: $('#tipoLogradouro_inst').val(),
					logradouro: $('#logradouro_inst').val(),
					numero: $('#numero_inst').val(),
					cep: $('#cep_inst').val(),
				}
	  		}
	  };

	  $.ajax({
			url:'http://localhost:8282/sniet_api/servlet/usuarios/',
 
			
			//ip aws
			//url:'http://52.14.130.196/
			//data: JSON.stringify({user:userModel, instituicao:instituicaoModel}),
			data: JSON.stringify(user),
			type:'POST',
			crossDomain: true,
	    	contentType: 'application/json; charset=utf-8',
			async:true,
			success: function (data,textStatus, jqXHR){				
				
				console.log('Success!!!');
				console.log(jqXHR);
				console.log(textStatus)
				console.log(jqXHR. always().getResponseHeader('Location'));

			},
			complete: function(jqXHR, textStatus) {
				console.log('Complete!!!');
				console.log(jqXHR);
				console.log(textStatus)
				console.log(jqXHR. always().getResponseHeader('Location'));
				//console.log(textStatus);
				/*for (var prop in JsonData) {
					console.log(JsonData[prop]);
				}*/
			},
			error: function(jqXHR, textStatus, errorThrown) { 
				console.log('Failed!');
				//console.log(jqXHR);
				//console.log(textStatus);
				console.log(errorThrown);
			 },
	  });

	});


	$('#btn-delete').on('click', function(){

		var id_user = $('#id-user').val();
		console.log('ID: ' + id_user);

		$.ajax({
			url:'http://localhost:8282/sniet_api/servlet/usuarios/'+id_user,
			type:'DELETE',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async:true,
			success: function(JsonData) {
				console.log("Success!!!");
				for (var prop in JsonData) {
					console.log(JsonData[prop]);
				}
			},
			error: function() { console.log();('Failed!'); },
		});

	});


	$('#btn-update').on('click', function(){

		var id_user = $('#id-user').val();
		console.log('ID: ' + id_user);

		$.ajax({
			url:'http://localhost:8282/sniet_api/servlet/usuarios/'+id_user,
			type:'DELETE',
			crossDomain: true,
			contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async:true,
			success: function(JsonData) {
				console.log("Success!!!");
				for (var prop in JsonData) {
					console.log(JsonData[prop]);
				}
			},
			error: function() { console.log();('Failed!'); },
		});

	});





});
