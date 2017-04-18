$(document).ready(function (){

	$('#tbl-users').hide();

	$('#btn-buscar').on('click', function(){

		var login = $('#search-login').val();
 
	  $.ajax({
			url:'http://localhost:8282/sniet_api/servlet/usuarios/'+login,
			type:'GET',
			crossDomain: true,
	    	contentType: 'text/plain; charset=utf-8',
			dataType: 'text',
			async:true,
			success: function(JsonData) {
				console.log("Success!!!");
				var json = JSON.parse(JsonData);
				//console.log(json);
				criaTabelaUsuarios(json);

				/*for (var prop in json) {
					console.log(json[prop]);
				}*/
			},
			error: function() { console.log();('Failed!'); },
	  });

	});



	function criaTabelaUsuarios(users){
		
		//console.log(users);
		var trUsuario = "";

		for (var user in users) {
			trUsuario	+=
				"<!-- usuarios -->" +
					"<tr>" +
						"<td id='id-user'>" + users[user].id + "</td>" +
						"<td class='name-user'>" + users[user].name + "</td>" +
						"<td class='email-user'>" + users[user].email + "</td>" +
						"<td class='name-user'>" + users[user].acessLevel + "</td>" +
						"<td> <input type='button' data-id="+users[user].id+
						" class='btn-update' value='Atualizar'> </td>" +
					"</tr>" +
				"<!-- usuarios -->";
		}

		$('#tbl-users').show();
		$('#tbl-users-body').empty().append(trUsuario);


		$('#tbl-users-body').on('click','.btn-update', function(){
			updateUsuario(users[$(this).index()]);
		})
		

	}




	function updateUsuario(user){

		console.log(user);

		var update = 
		
		"<div id='div-update' class='form-group'>" +
			"Nome: <input type='text' id='name'/></br>"+

			"Sobrenome: <input type='text' id='secondName'/></br>"+

			"Sexo: <select id='sex'>"+
					"<option value='M'>Masculino</option>"+
					"<option value='F'>Feminino</option>"+
				"</select></br>"+

			"Nivel de acesso:"+
				"<select id='acessLevel'>"+
					"<option value='3'>Comum</option>"+
					"<option value='2'>Pesquisador</option>"+
					"<option value='1'>Administrador</option>"+
				"</select></br>"+

			"E-mail: <input type='text' id='email'/></br>"+
			"Telefone: <input type='text' id='telefone'/></br>"+
			"Login: <input type='text' id='login'/></br>"+
			"Senha: <input type='password' id='password'/></br></br>"+

			"<input type='button' id='btn-cancel-update' value='Cancelar'>"+
			"<input type='button' id='btn-update-user' value='Atualizar'>"+
		"</div>";


		
		$('#busca').hide();
		$('#tbl-users').hide();
		$('#div-update').remove();
		$('body').append(update);

		$('#div-update').hide();
		$('#name').val(user.name);
		$('#secondName').val(user.secondName);
		$('#sex').val(user.sex);
		$('#acessLevel').val(user.acessLevel);
		$('#status').val(user.status);
		$('#email').val(user.email);
		$('#telefone').val(user.telefone);
		$('#login').val(user.login);
		$('#div-update').show();


		$('#btn-cancel-update').on('click', function(){
			$('#div-update').remove();
			$('#busca').show();
			$('#tbl-users').show();
		});


		$('#btn-update-user').on('click', function(){

			user.name = $('#name').val();
			user.secondName = $('#secondName').val();
			user.sex = $('#sex').val();
			user.acessLevel = $('#acessLevel').val();
			user.email = $('#email').val();
			user.telefone = $('#telefone').val();
			user.login = $('#login').val();

			console.log(user);

			$.ajax({
				url:'http://localhost:8282/sniet_api/servlet/usuarios/',
				data: JSON.stringify(user),
				type:'PUT',
				crossDomain: true,
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				async:true,
				success: function(JsonData) {
					console.log("Success!!!");
					for (var prop in JsonData) {
						console.log(JsonData[prop]);
					}
				},
				error: function() { console.log();('Failed!'); },
			});
		})

	}


});