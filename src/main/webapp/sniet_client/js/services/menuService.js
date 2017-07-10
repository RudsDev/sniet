angular.module('snietApp').factory('menuService',function(loginService){
	
	return  {
		showMenu: function () {

            let menu = document.querySelector('#menu-bar');
            
            if(!menu) return;	

            if(loginService.isLoged())
                menu.style.display = 'block';
            else
                menu.style.display = 'none';    

		},
		logout: function() {
            console.log('logout!');
            loginService.logout();
		}
	}
});