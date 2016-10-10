"use strict";
angular.module('app').factory('UserService', ['Restangular', function(Restangular){

	var obj = {};

	var _users = {};

	obj.all = function(){
		return _users;
	};

	obj.getUsers = function(){
		Restangular.all('users').getList().then(function(users){
			users.forEach(function(user){
				_users[user.id] = user;
			});
		});
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