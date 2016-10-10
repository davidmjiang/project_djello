"use strict";
angular.module('app').controller('BoardsIndexCtrl', ["$scope", "BoardsService", "currentUser", '$state', "ModalService", function($scope, BoardsService, currentUser, $state, ModalService){

	BoardsService.getBoards(currentUser).then(function(response){
          $scope.boards = response;
        });
	//get boards that current user is a member of
	BoardsService.getMemberBoards(currentUser).then(function(response){
		$scope.memberBoards = response;
	});

	$scope.create = function(){
		ModalService.showModal({
					templateUrl: "templates/createModal.html",
					controller: "CreateModalCtrl",
					inputs: {
						user: currentUser
					}
				}).then(function(modal){
					modal.element.modal();
					modal.close.then(function(result){
						console.log(result);
					});
				});
	};	

}]);