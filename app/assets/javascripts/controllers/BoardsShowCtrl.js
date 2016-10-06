"use strict";
angular.module('app').controller('BoardsShowCtrl', ["$scope", "BoardsService", "currentUser", "thisBoard", "$state", "ListService", function($scope, BoardsService, currentUser, thisBoard, $state, ListService){

	BoardsService.getBoards(currentUser).then(function(response){
          $scope.boards = response;
       });
	$scope.board = thisBoard;

	$scope.lists = $scope.board.lists;

	//creating a new board

	$scope.createMode = false;

	$scope.formData = {user_id: currentUser.id};

	$scope.createBoard = function(data){
		BoardsService.create(data).then(function(response){
			$state.go('boards.show',{id: response.id});
		});
	};

	//deleting the board

	$scope.delete = function(){
		$scope.board.remove().then(function(){
			$state.go('boards.index');
		});
	};

	//for creating a new list
	$scope.listData = {board_id: $scope.board.id};
	$scope.creatingList = false;
	$scope.createList = function(data){
		ListService.create(data).then(function(){
			$scope.board.refresh().then(function(response){
				angular.copy(response.lists, $scope.lists);
				$scope.creatingList = false;
				$scope.listData = {};
			});
		});
	};

	//redirect if currentUser is not the user of the board
	if(currentUser.id !== thisBoard.user.id){
		$state.go('boards.index');	
	}
}]);