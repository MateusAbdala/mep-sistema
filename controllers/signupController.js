angular.module('Authentication')

	.controller('SignUpController',
		['$rootScope', '$scope', '$timeout', '$location', '$http', 'SignUpClient', 'AuthenticationClient',
		function ($rootScope, $scope, $timeout, $location, $http, SignUpClient, AuthenticationClient) {

			$scope.estados = null;
			$scope.cidades = null;
			$scope.eixos = null;			
			$http({
				method: 'GET',
				url: '../lib/estados-cidades.json'
			}).then(function successCallback(response) {
                $scope.estados = response.data.estados;
            }, function errorCallback(response) {
				console.log('Could not load estados from JSON file');
			});

			$http({
                method: 'GET',
                url: '../lib/eixos-tecnologicos.json'
            }).then(function successCallback(response) {
                $scope.eixos = response.data.eixos;
            }, function errorCallback(response) {
                console.log('Could not load eixos from JSON file');
            });
			
			$scope.$watch('selectedState', function(newVal, oldVal){
				if($scope.selectedState){
					$scope.cidades = $scope.selectedState.cidades;
				}
			});

			$scope.$watch('selectedEixo', function(newVal, oldVal){
				if($scope.selectedEixo){
					$scope.eixos = $scope.selectedEixo.eixos;
				}
			});

			$scope.handleTabs = function (selectedTab) {
				if(selectedTab.id == 'tabUsuario'){
					$scope.tabProjetoSelected = false;
				} else if (selectedTab.id == 'tabProjeto'){
					$scope.tabProjetoSelected = true;
				}
			};

			$scope.signup = function () {
				$scope.dataLoading = true;
				SignUpClient.SignUp($scope.username, $scope.password, function(response) {
					if(response.data.success) {
						AuthenticationClient.Login($scope.username, $scope.password, function(authResponse) {
							if(authResponse.data.success) {
								AuthenticationClient.SetCredentials($scope.username, authResponse.data.token);
								$rootScope.$broadcast('userLoggedIn');
								$location.path('/');
							} else {
								$scope.error = authResponse.data.message;
								$scope.dataLoading = false;
							}
						});
					} else {
						$scope.error = response.data.message;
						$scope.dataLoading = false;
					}
				});
	    	};
		}]);

