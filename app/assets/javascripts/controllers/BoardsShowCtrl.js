"use strict";
angular.module('app').controller('BoardsShowCtrl', ["$scope", "BoardsService", "currentUser", "thisBoard", "$state", function($scope, BoardsService, currentUser, thisBoard, $state){

	BoardsService.getBoards(currentUser).then(function(response){
          $scope.boards = response;
       });
	$scope.board = thisBoard;

	$scope.createMode = false;
	$scope.editBoard = false;

	$scope.formData = {user_id: currentUser.id};

	$scope.createBoard = function(data){
		BoardsService.create(data).then(function(response){
			$state.go('boards.show',{id: response.id});
		});
	};

	$scope.delete = function(){
		$scope.board.remove().then(function(){
			$state.go('boards.index');
		});
	};
	
	$scope.editTitle = function(title){
		$scope.board.edit({title: title}).then(function(){
			BoardsService.getBoard($scope.board.id).then(function(response){
				$scope.board = response;
			});
		});
	};

	//redirect if currentUser is not the user of the board
	if(currentUser.id !== thisBoard.user.id){
		$state.go('boards.index');	
	}
}]);