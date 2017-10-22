angular.module('Authentication')

	.controller('SignUpController',
		['$rootScope', '$scope', '$timeout', '$location', '$http', 'SignUpClient', 'AuthenticationClient',
		function ($rootScope, $scope, $timeout, $location, $http, SignUpClient, AuthenticationClient) {

			this.aba = 1;
			
			this.isSet = function(checkAba) {
			  return this.aba == checkAba;
			};
			
			this.setTab = function(setAba) {
			  this.aba = setAba;
			};

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