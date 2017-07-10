angular.module('snietApp').factory('httpRequestInterceptor',function($q, $location, tokenService){
	return {
		request: function(config){

			config.headers = config.headers || {};	

			if (tokenService.getToken()) {
				config.headers['Authorization'] = tokenService.getToken();
			}
			
			return config;
		},
		response: function(config){
			return config;
		},
		responseError: function(response) {
			if (response.status === 401 || response.status === 403) {
				$location.path('/unauthorized');
			}
      		return $q.reject(response);
    	}
	};
});