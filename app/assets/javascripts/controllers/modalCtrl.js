"use strict";
angular.module('app').controller('ModalCtrl', ["$scope", "card", "close", "$element", "UserService", "_", 'Auth', function($scope, card, close, $element, UserService, _, Auth){

	$scope.card = card;
	$scope.title = card.title;
	$scope.description = card.description;
	$scope.newMember = "Choose a member";

	UserService.getMembers(card).then(function(response){
		$scope.members = response;
		$scope.memberIds = _.map($scope.members, function(el){
			return el.id;
		});
		UserService.getUsers().then(function(response){
			//filter out the current user and users who are already members
			$scope.users = response;
			Auth.currentUser().then(function(user){
				_.remove($scope.users, function(el){
					return el.id === user.id;
				});
			_.remove($scope.users, function(el){
				return _.indexOf($scope.memberIds, el.id) !== -1;
			});
				
			});
		});
	});

	$scope.addMember = function(){
		UserService.addMember(card, $scope.newMember).then(function(response){
			$scope.members.push(response);
			_.remove($scope.users, function(el){
				return el.id === response.id;
			});
			$scope.memberIds.push(response.id);
		});
	};

	$scope.removeMember = function(member){
		UserService.removeMember(card, member).then(function(){
			//remove member from $scope.members
			_.remove($scope.members, function(el){
				return el.id === member.id;
			});
			$scope.users.push(member);
			_.remove($scope.memberIds, function(el){
				return el === member.id;
			});
		});
	};

	$scope.close = function(){
		close("Success!");
	};

	$scope.cancel = function(){
		$element.modal('hide');
		close("Success!");
	};

	$scope.markComplete = function(){
		$scope.card.completed = true;
		$scope.card.edit({completed: true});
	};

}]);
