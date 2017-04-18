<<<<<<< HEAD
$(document).ready(function (){

=======


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


>>>>>>> c8c63bd... arquivos de cliente para testes

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
			password: $('#password').val()
	  }

	  $.ajax({
<<<<<<< HEAD
			//url:'http://localhost:8282/apirestex/servlet/usuarios/save',
			url:'http://localhost:8282/apirestex/servlet/usuarios/retornaMesmoUsuario',
=======
			//url:'http://localhost:8383/sniet_api/servlet/usuarios/save',
			url:'http://localhost:8282/sniet_api/servlet/usuarios/',
 
			//url:'http://localhost:8282/apirestex/servlet/usuarios/save',
			//url:'http://localhost:8282/sniet_api/servlet/usuarios/retornaMesmoUsuario',
>>>>>>> c8c63bd... arquivos de cliente para testes
			//url:'http://52.14.130.196/apirestex/servlet/usuarios/save',
			data: JSON.stringify(user),
			type:'POST',
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

	});
<<<<<<< HEAD
=======


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





>>>>>>> c8c63bd... arquivos de cliente para testes
});
