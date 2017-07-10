angular.module('snietApp').controller('menuCtrl', function($scope, $interval, $http, 
menuService){
	
    $scope.novoUsuario = 0;
	$scope.novoIncidente = 357;

	$scope.atualizaNotificacaoNovoUsuario = function($scope, $http){
		 $http.get('http://localhost:8282/sniet_api/servlet/usuarios')
		 .then(function(response){
			$scope.novoUsuario = response.data.length;
		})
		.catch(function(){
			console.log("erro no listar usuarios")
		});

		$interval(atualizaNotificacaoNovoUsuario, 10000);
	},

	$scope.logout = function(){
		menuService.logout();
	}

	menuService.showMenu();

});