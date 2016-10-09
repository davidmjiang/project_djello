"use strict";
angular.module('app').directive('listBox', ['ListService', 'CardService', 'ModalService', 'ActivityService', function(ListService, CardService, ModalService, ActivityService){
	return{
		restrict: "E",
		templateUrl: "templates/listBox.html",
		scope: {
			list: "=",
			lists: "=",
			board: "=",
			user: "="
		},
		link: function(scope){
			CardService.getCards(scope.list.id).then(function(response){
				scope.cards = response;
			});
			scope.createMode = false;
			scope.cardData = {list_id: scope.list.id,
												completed: false};
			scope.creating = function(){
				scope.createMode = true;
			};
			scope.createCard = function(){
				CardService.create(scope.cardData).then(function(response){
					scope.cards.push(response);
					scope.cardData.title = "";
					scope.createMode = false;
					var activity = scope.user.username+ " added this card to the " + scope.board.title + " board";
					ActivityService.create(activity, response);
				});
			};
			scope.openModal = function(card){
				ModalService.showModal({
					templateUrl: "templates/cardModal.html",
					controller: "ModalCtrl",
					inputs: {
						card: card
					}
				}).then(function(modal){
					modal.element.modal();
					modal.close.then(function(result){
						console.log(result);
					});
				});
			};
			scope.delete = function(){
				scope.list.remove().then(function(){
					ListService.getLists(scope.board.id).then(function(response){
						angular.copy(response,scope.lists);
					});
				});
			};
		}
	};
}]);