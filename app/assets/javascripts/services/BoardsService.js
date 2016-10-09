"use strict";
angular.module('app').factory('BoardsService', ['Restangular', '_', 'ListService', function(Restangular, _, ListService){

	var obj = {};

	obj.getBoards = function(user){
		return Restangular.all('boards').getList({user_id: user.id});
	};

	obj.getBoard = function(id){
		return Restangular.one('boards', id).get().then(function(response){
			Restangular.restangularizeCollection(null, response.lists, 'lists');
			return response;
		});
	};

	obj.getMemberBoards = function(user){
		return Restangular.all('users').customGET('boards', {id: user.id});
	};

	obj.create = function(data){
		var boardData = {
			board: data
		};
		return Restangular.all('boards').post(boardData);
	};

	Restangular.extendModel("boards", function(model){
		model.edit = function(data){
			model.patch({board: data});
		};

		model.refresh = function(){
			return obj.getBoard(model.id).then(function(response){
				return response;
			});
		};

		return model;
	});

	return obj;
}]);