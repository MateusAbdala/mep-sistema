angular.module('Authentication')

	.controller('LogoutController',
		['$rootScope', '$timeout', '$location', 'AuthenticationClient',
		function ($rootScope, $timeout, $location, AuthenticationClient) {
			AuthenticationClient.ClearCredentials();
			$rootScope.$broadcast('userLoggedIn');
			$timeout(function() {
     		$location.path('/');
      }, 2000);
		}]);