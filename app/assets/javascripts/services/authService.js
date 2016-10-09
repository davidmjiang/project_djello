"use strict";
angular.module('app').factory('AuthService', ['Auth', function(Auth){

	var obj = {};

	obj.userPromise = Auth.currentUser();

	return obj;

}]);
