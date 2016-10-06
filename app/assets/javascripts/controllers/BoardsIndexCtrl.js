"use strict";
angular.module('app').controller('BoardsIndexCtrl', ["$scope", "BoardsService", "currentUser", function($scope, BoardsService, currentUser){

	BoardsService.getBoards(currentUser).then(function(response){
		$scope.boards = response;
	});

	$scope.createMode = false;

	$scope.formData = {user_id: currentUser.id};

	$scope.createBoard = function(data){
		BoardsService.create(data).then(function(response){
			console.log(response);
			BoardsService.getBoards(currentUser).then(function(response){
				$scope.boards = response;
			});
		});
	};

}]);