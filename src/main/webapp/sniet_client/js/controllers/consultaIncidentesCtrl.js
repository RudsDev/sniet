angular.module('snietApp').controller('consultaIncidentesCtrl', function($scope, $http){
    
	$scope.msg ='consultaIncidentesCtrl';
	$scope.incidentes= [];
	$scope.individuos= null;

	$scope.pontos = function(){
		console.log('pontos!');
		// http://localhost:8282//sniet_api/map/maps.html
		// http://localhost:8282/apirestex/map/maps.html
		var map = "<iframe src='http://localhost:8282/sniet_api/map/maps.html' width='90%' height='300px' style='position: relative; left: 5%; top: -10px'></iframe>";

		$('#mapa').empty().append(map);
	}

	$scope.ponto = function(id){
		console.log('ponto!!!');
		// http://localhost:8282//sniet_api/map/maps.html
		// http://localhost:8282/apirestex/map/maps.html
		var map = "<iframe src='http://localhost:8282/sniet_api/map/map_one.html?individuoID="+id+"' width='90%' height='300px' style='position: relative; left: 5%; top: -10px'></iframe>";

		$('#mapa').empty().append(map);
	}

	$scope.listarIncidentes = function(){

		$http.get('http://localhost:8282/sniet_api/servlet/incidents/').then(function(response){
			$scope.incidentes = response.data;
			console.log($scope.incidentes);
		})
		.catch(function(e){
			console.log('Erro!');
			console.log(e);
		});
	}


	$scope.listarIndividuos = function(){

		$http.get('http://localhost:8282/sniet_api/servlet/incidents/all').then(function(response){
			$scope.individuos = response.data;
			//console.log($scope.individuos);
		})
		.catch(function(e){
			console.log("Error!")
			console.log(e);
		});
	}

	$scope.dadosModal = function(incidente){

    	$scope.descricaoIncidente = incidente.descricaoIncidente;
		$scope.dataIncidente =incidente.dataIncidente;
		$scope.statusIncidente =incidente.statusIncidente;
		$scope.nomeLocal =incidente.nomeLocal;
		$scope.pais =incidente.pais;
		$scope.UF =incidente.UF;
		$scope.cidade =incidente.cidade;
		$scope.bairro =incidente.bairro;
		$scope.latitude =incidente.latitude;
		$scope.longitude =incidente.longitude;
		$scope.idade =incidente.idade;
		$scope.nome =incidente.nome;
		$scope.profissao =incidente.profissao;
		$scope.sexo =incidente.sexo;
		$scope.tipoPratica =incidente.tipoPratica;
		$scope.statusPratica =incidente.statusPratica;
		$scope.descricaoPratica =incidente.descricaoPratica;

	}

	$scope.editarIncidente = function(){

		var incidenteEdit ={	  
			incidente : {
				descIncidente: $scope.descricaoIncidente,
				dataIncidente: $scope.dataIncidente,
				status: $scope.statusIncidente,
				local: {
					nomeLocal: $scope.nomeLocal,
					pais: $scope.pais,
					uf: $scope.UF,
					cidade: $scope.cidade,
					bairro: $scope.bairro,
					latitude: $scope.latitude,
					longitude: $scope.longitude,
				},
			},
			individuo: {
				idade: $scope.idade,
				nome: $scope.nome,
				profissao: $scope.profissao,
				sex: $scope.sexo,
				pratica: {
					tipoPratica: $scope.tipoPratica,
					statusPratica: $scope.statusPratica,
					descPratica: $scope.descricaoPratica
				}
			}
		};

		var header = {
			headers : {'Content-Type' : 'application/json; charset=UTF-8'}
		};

		$http.put("http://localhost:8282/sniet_api/servlet/incidents/", incidenteEdit, header).then(function(response){
			$scope.limparCampos();
			//$scope.listarIndividuos();
		});
	}
	
	$scope.listarIndividuos();

});