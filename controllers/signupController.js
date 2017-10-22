angular.module('Authentication')

	.controller('SignUpController',
		['$rootScope', '$scope', '$timeout', '$location', '$http', 'SignUpClient', 'AuthenticationClient',
		function ($rootScope, $scope, $timeout, $location, $http, SignUpClient, AuthenticationClient, fileReader) {


		    //Example file upload - START
            $scope.imageSrc = "";
            $scope.$on("fileProgress",
                function(e, progress) {
                    $scope.progress = progress.loaded / progress.total;
                });
            //Example file upload - END


			$scope.aba = 1;
			
			$scope.isSet = function(checkAba) {
			  return $scope.aba == checkAba;
			};
			
			$scope.setAba = function(setAba) {
				alert("setAba");
				$scope.aba = setAba;
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
			
}])
//Example file upload - START
.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});
//Example file upload - END