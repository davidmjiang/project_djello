"use strict";
angular.module('app').factory('ActivityService', ['Restangular', function(Restangular){

	var obj = {};

	obj.create = function(text, card){
		var activityData = {text: text, card_id: card.id};
		return Restangular.all("activities").post({activity: activityData});
	};

	obj.getActivities = function(card){
		return Restangular.all("activities").getList({card_id: card.id});
	};

	return obj;

}]);