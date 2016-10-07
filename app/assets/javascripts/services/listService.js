"use strict";
angular.module('app').factory('ListService', ['Restangular', function(Restangular){

	var obj = {};

	obj.create = function(data){
		var listData = {
			list: data
		};
		return Restangular.all('lists').post(listData);
	};

	obj.getLists = function(boardId){
		return Restangular.all('lists').getList({board_id: boardId});
	};

	Restangular.extendModel("lists", function(model){
		model.edit = function(data){
			model.patch({list: data});
		};
		return model;
	});

	return obj;
}]);