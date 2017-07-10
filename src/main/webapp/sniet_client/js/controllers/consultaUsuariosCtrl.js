angular.module('snietApp').controller('consultaUsuarioCtrl', function($scope, $http){

	$scope.listarUsuarios = function(){
        $http.get('http://localhost:8282/sniet_api/servlet/usuarios').then(function(response){

			$scope.usuarios = response.data;

		})
		.catch(function(e){
			console.log("Error!")
			console.log(e);
		});
    }


		$scope.editarUsuario = function(usuario){

			var usuarioEdit ={	  
				usuarioId : usuario.instituicaoId,
				secondName : usuario.sobrenome,
				name : usuario.nome,
				email : usuario.email,
				sex : usuario.sexo,
				phone : usuario.telefone,
				acessLevel : usuario.perfil,
				login : usuario.login,
				status : usuario.status,
				password : usuario.senha
				};

				var header = {
				headers : {'Content-Type' : 'application/json; charset=UTF-8'}
			};

			$http.put("http://localhost:8282/sniet_api/servlet/incidentes/full", usuarioEdit, header).then(function(response){

						$scope.limparUsuarios();

						//$scope.listarIndividuos();
			});
		}
	$scope.listarUsuarios();

});