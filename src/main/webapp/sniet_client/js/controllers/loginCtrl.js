angular.module('snietApp').controller('loginCtrl', function($scope, loginService){


	var header = {
	headers : {'Content-Type' : 'application/json; charset=UTF-8'}};

	$scope.logar = function(loginUser){
		console.log('logando...')
		var data = angular.copy(loginUser);
		delete $scope.loginUser;
		loginService.login(data,header);
	}
});