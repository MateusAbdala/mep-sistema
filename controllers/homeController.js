angular.module('Home', [])

.controller('HomeController', ["$scope", "$rootScope", "$window", 
	function($scope, $rootScope, $window) {
		
		$scope.userLoggedIn = $window.localStorage['userLoggedIn'];

		$scope.$watch(
			function() { 
				return $window.localStorage['userLoggedIn']; 
			}, 
			function(newValue, oldValue){
				if(oldValue !== newValue){
					$scope.userLoggedIn = newValue;
				}
			}
		);
}]);