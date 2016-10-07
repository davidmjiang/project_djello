"use strict";
angular.module('app').factory('UserService', ['Restangular', function(Restangular){

	var obj = {};

	obj.getUsers = function(){
		return Restangular.all('users').getList();
	};

	obj.addMember = function(card, userId){
		var params = {card_id: card.id, 
									user_id: userId};
		return Restangular.all('memberships').post({membership: params});
	};

	obj.getMembers = function(card){
		return Restangular.all('cards').customGET('members', {id: card.id});
	};

	obj.removeMember = function(card, member){
		return Restangular.all('memberships').remove({card_id: card.id, user_id: member.id});
	};

	return obj;
}]);