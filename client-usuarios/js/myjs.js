$(document).ready(function (){


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
			//url:'http://localhost:8282/apirestex/servlet/usuarios/save',
			url:'http://localhost:8282/apirestex/servlet/usuarios/retornaMesmoUsuario',
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
});
