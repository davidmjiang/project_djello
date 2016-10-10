"use strict";
angular.module('app').controller('BoardsShowCtrl', ["$scope", "BoardsService", "currentUser", "thisBoard", "$state", "ListService", "_", "ModalService", function($scope, BoardsService, currentUser, thisBoard, $state, ListService, _, ModalService){

	BoardsService.getBoards(currentUser).then(function(response){
          $scope.boards = _.filter(response, function(el){ return thisBoard.id !== el.id; } );
       });
	$scope.board = thisBoard;

	$scope.lists = $scope.board.lists;

	$scope.user = currentUser;

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
		ModalService.showModal({
					templateUrl: "templates/deleteModal.html",
					controller: "DeleteModalCtrl",
					inputs: {
						board: $scope.board
					}
				}).then(function(modal){
					modal.element.modal();
					modal.close.then(function(result){
						console.log(result);
					});
				});
	};

	$scope.create = function(){
		ModalService.showModal({
					templateUrl: "templates/createModal.html",
					controller: "CreateModalCtrl",
					inputs: {
						user: $scope.user
					}
				}).then(function(modal){
					modal.element.modal();
					modal.close.then(function(result){
						console.log(result);
					});
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

}]);