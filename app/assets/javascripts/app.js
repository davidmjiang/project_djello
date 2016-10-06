"use strict";
angular.module('app', ['ui.router', "restangular", "Devise"]);

angular.module('app').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('app').config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for restangular
angular.module('app').config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('boards', {
		url: '/',
		controller: 'BoardsIndexCtrl',
		templateUrl: 'templates/boards/index.html',
		resolve: {
			currentUser: ['Auth', function(Auth){
            return Auth.currentUser()
            .then(function(user){
              return user;
            });
          }]
		}
	});

}]);