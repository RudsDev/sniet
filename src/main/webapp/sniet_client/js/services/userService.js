angular.module('snietApp').factory('userService',function($localStorage){
	
	return  {
		setUserLoged: function (userLoged) {
			$localStorage.userLoged = userLoged;
		},
		getUserLoged: function() {
			return $localStorage.userLoged;
		},
		removeUserLoged: function () {
			delete $localStorage.userLoged;
		}
	}
});