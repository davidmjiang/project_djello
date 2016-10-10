"use strict";
angular.module('app').controller('ModalCtrl', ["$scope", "card", "close", "$element", "UserService", "_", 'Auth', "ActivityService",function($scope, card, close, $element, UserService, _, Auth, ActivityService){

	$scope.card = card;
	$scope.title = card.title;
	$scope.description = card.description;
	$scope.newMember = "Choose a member";
	$scope.userHash = UserService.all();

	UserService.getMembers(card).then(function(response){
		$scope.members = response;
		$scope.memberIds = _.map($scope.members, function(el){
			return el.id;
		});
		$scope.users = _.values($scope.userHash);

		Auth.currentUser().then(function(user){
			$scope.currentUser = user;
			_.remove($scope.users, function(el){
				return el.id === user.id;
			});
		_.remove($scope.users, function(el){
			return _.indexOf($scope.memberIds, el.id) !== -1;
		});
			
		});
		
	});

	$scope.activities = ActivityService.activities()[card.id];

	$scope.addMember = function(){
		UserService.addMember(card, $scope.newMember).then(function(response){
			$scope.members.push(response);
			_.remove($scope.users, function(el){
				return el.id === response.id;
			});
			$scope.memberIds.push(response.id);
			//add to activity that new member was added
			var text = $scope.currentUser.username + " added " + $scope.userHash[$scope.newMember].username + " as a member of this card";
			ActivityService.create(text, card);
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
			//add to activity
			var text = $scope.currentUser.username + " removed " + member.username + " from this card";
			ActivityService.create(text, card);
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
		$scope.card.edit({completed: true}, "status", "completed");
	};

}]);
