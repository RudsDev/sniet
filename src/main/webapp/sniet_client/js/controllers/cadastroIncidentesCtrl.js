angular.module('snietApp').controller('cadastroIncidenteCtrl', function($scope, $http){

	$scope.inserirIncidente = function(){
	
		var incidenteWrapper ={	  
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
	 		headers : {'Content-Type' : 'application/json;'}
	   	};
	   
	   $http.post("http://localhost:8282/sniet_api/servlet/incidents/",
	   		 incidenteWrapper, header).then(function(response){
			 $scope.limparCampos();
	   });
    }

	$scope.deletarIncidente = function(){
	
		var incidenteWrapper ={	  
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
	 		headers : {'Content-Type' : 'application/json;'}
	   	};
	   
	   $http.post("http://localhost:8282/sniet_api/servlet/incidents/",
	   		 incidenteWrapper, header).then(function(response){
			 $scope.limparCampos();
	   });
    }

	$scope.limparCampos = function(){

			$scope.descricaoIncidente="";
			$scope.dataIncidente="";
			$scope.statusIncidente="";
			$scope.nomeLocal="";
			$scope.pais="";
			$scope.UF="";
			$scope.cidade="";
			$scope.bairro="";
			$scope.latitude="";
			$scope.longitude="";
			$scope.idade="";
			$scope.nome="";
			$scope.profissao="";
			$scope.sexo="";
			$scope.tipoPratica="";
			$statusPratica="";
			$scope.descricaoPratica ="";

    }
});