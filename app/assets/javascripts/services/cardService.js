"use strict";
angular.module("app").factory('CardService',['Restangular', 'AuthService', 'ActivityService', function(Restangular, AuthService, ActivityService){

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
		model.edit = function(data, attr, text){
			model.patch({card: data});

			AuthService.userPromise.then(function(user){
				var t = user.username + " changed the " + attr + " of this card to '" + text+ "'";
				ActivityService.create(t, model);
			});
			//add activity
		};
		return model;
	});

	return obj;

}]);	