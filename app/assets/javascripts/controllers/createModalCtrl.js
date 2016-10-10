"use strict";
angular.module('app').controller('CreateModalCtrl', ["$scope", "close", "$element", "$state", "user", "BoardsService", function($scope, close, $element, $state, user, BoardsService){

	$scope.formData = {user_id: user.id};

	$scope.close = function(){
		close("Success!");
	};

	$scope.cancel = function(){
		$element.modal('hide');
		close("Success!");
	};

	$scope.create = function(data){
		BoardsService.create(data).then(function(response){
			$element.modal('hide');
			$state.go('boards.show',{id: response.id});
		});
	};

}]);