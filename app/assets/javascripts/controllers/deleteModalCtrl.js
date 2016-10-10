"use strict";
angular.module('app').controller('DeleteModalCtrl', ["$scope", "board", "close", "$element", "$state", function($scope, board, close, $element, $state){

	$scope.board = board;

	$scope.close = function(){
		close("Success!");
	};

	$scope.cancel = function(){
		$element.modal('hide');
		close("Success!");
	};

	$scope.delete = function(){
		$scope.board.remove().then(function(){
			$element.modal('hide');
			$state.go('boards.index');
		});
	};

}]);