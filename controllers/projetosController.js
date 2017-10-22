angular.module('Projeto', [])

.controller('ProjetoController', ['$scope', 'ProjetoClient', '$routeParams', 'PagerService','$http',
function($scope, ProjetoClient, $routeParams, PagerService, $http) {

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

    var vm = this;
    vm.pager = {};
    vm.setPage = setPage;
    $scope.pageSize = 8;
    var visiblePages = 8;

    if($routeParams.id){
        ProjetoClient.GetDetails($routeParams.id).then(function (response) {
            $scope.projeto = response.data[0];
        }, function (error) {
            console.log('Unable to load project details: ' + error.message);
        });
    } else {
        ProjetoClient.GetAllProjects().then(function (response) {
            vm.projetos = response.data;
            vm.items = vm.projetos;
            vm.pager = PagerService.GetPager(vm.projetos.length, 1, visiblePages, $scope.pageSize);
        }, function (error) {
            console.log('Unable to load projects: ' + error.message);
        });
    }    

    function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }
        vm.pager = PagerService.GetPager(vm.projetos.length, page, visiblePages);
        vm.items = vm.projetos.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }

}]);