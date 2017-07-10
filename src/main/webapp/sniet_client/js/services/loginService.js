angular.module('snietApp').factory('loginService',function($http, $location,
tokenService, userService){

	return{

		login: function(data, header) {

			$http.post('http://localhost:8282/sniet_api/servlet/usuarios/login',
			data, header).then(function(response){

				//console.log('Token: '+ response.headers('authorization'));

				tokenService.setToken(response.headers('authorization'));
				userService.setUserLoged(response.data);
				$location.path('/home');

			})
			.catch(function(e){
				userService.setUserLoged(null);
				console.log('Error!');
				console.log(e);
				if (e.status === 401 || e.status === 403) {
					$location.path('/unauthorized');
				}
			});
		},
		logout: function () {
			tokenService.deleteToken();
			userService.removeUserLoged();
			$location.path('/login');
		},
		isLoged: function () {
			if(!userService.getUserLoged())
				return false
			return true;
		}
	}
});