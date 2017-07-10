angular.module('snietApp').controller('cadastroUsuarioCtrl', function($scope, $http){

    //Inicialização dos campos da tela
	//Lista para table(read)
	$scope.usuarios= [];
	
	//ng-model(binding)
	$scope.instituicaoId = '';
	$scope.usuarioId = '';
	$scope.sobrenome = '';
	$scope.nome = '';
	$scope.email = '';
	$scope.sexo = '';
	$scope.telefone = '';
	$scope.perfil = '';
	$scope.status = '';
	$scope.login = '';
	$scope.senha = '';

	$scope.instituicaoNome = '';
	$scope.instituicaoTipo = '';
	$scope.instituicaoRegistro = '';


	$scope.enderecoPais = '';
	$scope.enderecoUF = '';
	$scope.enderecoBairro = '';
	$scope.enderecoCidade = '';
	$scope.enderecoTipoLogradouro = '';
	$scope.enderecoLogradouro = '';
	$scope.enderecoNumero = '';
	$scope.enderecoCEP = '';
	
	

	//Objeto JSON vazio(create, edit, delete)
	$scope.usuario = {

	};
	
	//Funções no escopo do controlador	
	$scope.inserirUsuario = function(){
		var user = {
					'name': $scope.nome,
					'secondName': $scope.sobrenome,
					'sex': $scope.sexo,
					'acessLevel': $scope.perfil,
					'status': $scope.status,
					'email': $scope.email,
					'phone': $scope.telefone,
					'login': $scope.login,
					'password': $scope.senha,
					'instituicao': {
						'nome': $scope.instituicaoNome,
						'registro': $scope.instituicaoRegistro,
						'tipoInstituicao': $scope.instituicaoTipo,
					}
			};

		var msgtoast = $scope.nome;

		var header = {
			headers : {'Content-Type' : 'application/json; charset=UTF-8'}
		};

			$http.post("http://localhost:8282/sniet_api/servlet/usuarios", user, header).then(function(response){

					$scope.limparCampos();	
					var $toastContent = $("<span>"+msgtoast+" salvo com sucesso!</span>");
					Materialize.toast($toastContent, 5000);			
		});
    }

    $scope.dadosModal = function(u){
		$scope.instituicaoId = u.instituicaoId;
		$scope.usuarioId = u.usuarioId;
		$scope.sobrenome = u.sobrenome;
		$scope.nome = u.nome;
		$scope.email = u.email;
		$scope.sexo = u.sexo;
		$scope.telefone = u.telefone;
		$scope.perfil = u.perfil;
		$scope.status = u.status;
		$scope.login = u.login;
		$scope.senha = u.senha;	
    }

    $scope.editarUsuario = function(){

	    var u = {
			'instituicaoId' : $scope.instituicaoId,
			'usuarioId' : $scope.usuarioId,
			'login' : $scope.login,
			'senha' : $scope.senha,
			'status' : $scope.status,
			'sobrenome' : $scope.sobrenome,
			'nome' : $scope.nome,
			'email' : $scope.email,
			'sexo' : $scope.sexo,
			'telefone' : $scope.telefone,
			'perfil' : $scope.perfil
		};

    	var header = {
	 		headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
	   	};
	   
	   $http.post("http://www.phpemacao.96.lt/api/updateUsuario.php", u).then(function(response){
            $scope.limparCampos();
	   });
    }

    $scope.limparCampos = function(){

		$scope.instituicaoId = '';
		$scope.usuarioId = '';
		$scope.sobrenome = '';
		$scope.nome = '';
		$scope.email = '';
		$scope.sexo = '';
		$scope.telefone = '';
		$scope.perfil = '';
		$scope.status = '';
		$scope.login = '';
		$scope.senha = '';

		$scope.instituicaoNome = '';
		$scope.instituicaoTipo = '';
		$scope.instituicaoRegistro = '';


		$scope.enderecoPais = '';
		$scope.enderecoUF = '';
		$scope.enderecoBairro = '';
		$scope.enderecoCidade = '';
		$scope.enderecoTipoLogradouro = '';
		$scope.enderecoLogradouro = '';
		$scope.enderecoNumero = '';
		$scope.enderecoCEP = '';

    }

    $scope.deletarUsuario = function(u){

    	var del = {
		'instituicaoId' : u.instituicaoId,
		'usuarioId' : u.usuarioId,
		'login' : u.login,
		'senha' : u.senha,
		'status' : u.status,
		'sobrenome' : u.sobrenome,
		'nome' : u.nome,
		'email' : u.email,
		'sexo' : u.sexo,
		'telefone' : u.telefone,
		'perfil' : u.perfil
		   };

    	var header = {
	 		headers : {'Content-Type' : 'application/json; charset=UTF-8'}
	   	};
	   
	   $http.post("http://www.phpemacao.96.lt/api/deleteUsuario.php", del, header).then(function(response){
			
	   });
    }
});