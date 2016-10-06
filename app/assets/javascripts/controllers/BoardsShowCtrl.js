"use strict";
angular.module('app').controller('BoardsShowCtrl', ["$scope", "BoardsService", "currentUser", "thisBoard", function($scope, BoardsService, currentUser, thisBoard){

	$scope.board = thisBoard;


	//redirect if currentUser is not the user of the board
}]);