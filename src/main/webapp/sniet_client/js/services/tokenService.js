angular.module('snietApp').factory('tokenService',function($localStorage){
	
	return  {
		setToken: function (token) {
			$localStorage.token = token;
		},
		getToken: function() {
			return $localStorage.token;
		},
		deleteToken: function () {
			delete $localStorage.token;
		}
	}
});
