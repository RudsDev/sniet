angular.module('snietApp').config(function ($routeProvider, $locationProvider,
 $httpProvider) {

	$httpProvider.interceptors.push('httpRequestInterceptor');

    $locationProvider.hashPrefix('');	

    $routeProvider.when('/', {
        templateUrl:'login.html',
        controller:'loginCtrl',
		authorize: false,
		level:4,   
    });
	$routeProvider.when('/home', {
		templateUrl:'view/main.html',
        controller:'homeCtrl',
		authorize: true,
		level:4,   
    });
	 $routeProvider.when('/sobre', {
        templateUrl:'view/sobre.html',
        controller:'sobreCtrl',
		authorize: false,
		level:4,   
    });
	$routeProvider.when('/novo-usuario', {
        templateUrl:'view/novo-usuario.html',
        controller:'cadastroUsuarioCtrl',
		authorize: true,
		level:1,   
    });
    $routeProvider.when('/login', {
        templateUrl:'login.html',
        controller:'loginCtrl',
		authorize: false,
		level:4,   
   });
    $routeProvider.when('/registrar', {
        templateUrl:'view/registrar.html',
        controller:'loginCtrl',
		authorize: false,
		level:4,   
   });
    $routeProvider.when('/cadastro-usuario', {
        templateUrl:'view/cadastro-usuario.html',
        controller:'cadastroUsuarioCtrl',
		authorize: true,
		level:1,
    });
    $routeProvider.when('/cadastro-incidente', {
        templateUrl:'view/cadastro-incidente.html', 
        controller:'cadastroIncidenteCtrl',
		authorize: true,
		level:1,
    });
	$routeProvider.when('/consulta-incidentes', {
        templateUrl:'view/incidentes.html', 
        controller:'consultaIncidentesCtrl',
		authorize: true,
		level:3,
    });
    $routeProvider.when('/consulta-usuario', {
        templateUrl:'view/usuarios.html',
        controller:'consultaUsuarioCtrl',
		authorize: true,
		level:1,   
    });
    $routeProvider.when('/usuarios-pendentes', {
        templateUrl:'view/usuarios-pendentes.html',
        controller:'usuariosPendentesCtrl',
		authorize: true,
		level:1,  
    });
    $routeProvider.when('/incidentes-pendentes', {
        templateUrl:'view/incidentes-pendentes.html',
        controller:'incidentesPendentesCtrl',
		authorize: true,
		level:1,
    });
	    $routeProvider.when('/unauthorized', {
        templateUrl:'view/401.html',
		authorize: false,
		level:4,
    });
    $routeProvider.otherwise({
        templateUrl: 'view/404.html',
		authorize: false,
		level:4,
    });
});