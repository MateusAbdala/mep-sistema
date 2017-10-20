angular.module('Projeto')

.factory('ProjetoClient',
    ['$http', '$rootScope', '$timeout', '$window',
    function ($http, $rootScope, $timeout, $window) {
        
        var urlBase = 'http://localhost:8082';
        var service = {};

        service.GetAllProjects = function () {
        	return $http.get(urlBase);
    		};

    		service.GetDetails = function (id) {
        	return $http.get(urlBase + "/" + id);
    		};

        return service;
    }])
