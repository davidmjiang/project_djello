"use strict";
angular.module('app').factory('BoardsService', ['Restangular', '_', function(Restangular, _){

	var obj = {};

	obj.getBoards = function(user){
		return Restangular.all('boards').getList({user_id: user.id});
	};

	obj.getBoard = function(id){
		return Restangular.one('boards', id).get();
	};

	obj.create = function(data){
		var boardData = {
			board: data
		};
		return Restangular.all('boards').post(boardData);
	};

	return obj;
}]);