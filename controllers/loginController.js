angular.module('Authentication', [])

	.config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
	    $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
	})

	.controller('LoginController',
		['$scope', '$rootScope', '$location', 'AuthenticationClient',
		function ($scope, $rootScope, $location, AuthenticationClient) {
	    
	    AuthenticationClient.ClearCredentials();
	    
	    $scope.login = function () {
	        $scope.dataLoading = true;
	        AuthenticationClient.Login($scope.username, $scope.password, function(response) {
	            if(response.data.success) {
	            	AuthenticationClient.SetCredentials($scope.username, response.data.token);
	            	$rootScope.$broadcast('userLoggedIn');
	            	$location.path('/');
	            } else {
	              $scope.error = response.data.message;
	              $scope.dataLoading = false;
	            }
	        });
	    };
	}]);