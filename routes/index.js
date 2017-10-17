angular.module('mep')

.config(['$routeProvider', function ($routeProvider) {
    var fragmentsBase = '../fragments';
    $routeProvider
      .when('/login', {
        module: 'Authentication',
        controller: 'LoginController',
        templateUrl: fragmentsBase + '/login.html'
      })
      .when('/signup', {
        module: 'Authentication',
        controller: 'SignUpController',
        templateUrl: fragmentsBase + '/signup.html'
      })
      .when('/logout', {
        module: 'Authentication',
        controller: 'LogoutController',
        templateUrl: fragmentsBase + '/logout.html'
      })
      .when('/participe', {
        templateUrl: fragmentsBase + '/participe.html'
      })
      .when('/sobre', {
        templateUrl: fragmentsBase + '/sobre.html'
      })
      .when('/projetos', {
        module: 'Projeto',
        controller: 'ProjetoController',
        controllerAs: 'vm',
        templateUrl: fragmentsBase + '/projetos.html'
      })
      .when('/projetos/:id', {
        module: 'Projeto',
        controller: 'ProjetoController',
        controllerAs: 'vm',
        templateUrl: fragmentsBase + '/projetoSelecionado.html'
      }).otherwise({
        templateUrl : fragmentsBase + '/home.html'
      })
  }]);