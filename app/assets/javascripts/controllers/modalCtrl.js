"use strict";
angular.module('app').controller('ModalCtrl', ["$scope", "card", "close", "$element",function($scope, card, close, $element){

	$scope.card = card;
	$scope.title = card.title;
	$scope.description = card.description;

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
