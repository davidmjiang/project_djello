"use strict";
angular.module('app').factory('ActivityService', ['Restangular', function(Restangular){

	var obj = {};

	var _activities = {};

	obj.getAll = function(){
		Restangular.all("cards").getList()
		.then(function(cards){
			cards.forEach(function(card){
				obj.getActivities(card).then(function(activities){
					_activities[card.id] = activities;
				});
			});
		});
	};

	obj.create = function(text, card){
		var activityData = {text: text, card_id: card.id};
		Restangular.all("activities").post({activity: activityData}).then(function(response){
			_activities[card.id].push(response);
		});
	};

	obj.getActivities = function(card){
		return Restangular.all("activities").getList({card_id: card.id});
	};

	obj.activities = function(){
		return _activities;
	};

	return obj;

}]);