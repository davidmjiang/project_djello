"use strict";
angular.module('app').controller('BoardsIndexCtrl', ["$scope", "BoardsService", "currentUser", '$state', function($scope, BoardsService, currentUser, $state){

	BoardsService.getBoards(currentUser).then(function(response){
          $scope.boards = response;
        });
	//get boards that current user is a member of
	BoardsService.getMemberBoards(currentUser).then(function(response){
		$scope.memberBoards = response;
	});

	$scope.createMode = false;

	$scope.formData = {user_id: currentUser.id};

	$scope.createBoard = function(data){
		BoardsService.create(data).then(function(response){
			$state.go('boards.show',{id: response.id});
		});
	};

}]);