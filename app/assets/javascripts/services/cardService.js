"use strict";
angular.module("app").factory('CardService', ['Restangular', function(Restangular){

	var obj = {};

	obj.getCards = function(listId){
		return Restangular.all('cards').getList({list_id: listId});
	};

	obj.create = function(data){
		var cardData = {
			card: data
		};
		return Restangular.all('cards').post(cardData);
	};

	Restangular.extendModel("cards", function(model){
		model.edit = function(data){
			model.patch({card: data});
		};
		return model;
	});

	return obj;

}]);	