angular.module('Authentication')

.factory('SignUpClient',
    ['$http', '$rootScope', '$timeout', '$window',
    function ($http, $rootScope, $timeout, $window) {
        var service = {};

        service.SignUp = function (username, password, callback) {
            $http({
            	headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
						  method: 'POST',
						  url: 'http://localhost:8081/signup',
						  data: { 
						  	name: username, 
						  	password: password 
						  }
						}).then(function successCallback(response) {
					    callback(response);
					  }, function errorCallback(response) {
					    
					  });

        };

        return service;
    }])
