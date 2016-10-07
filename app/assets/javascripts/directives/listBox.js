"use strict";
angular.module('app').directive('listBox', ['ListService', 'CardService', 'ModalService', function(ListService, CardService, ModalService){
	return{
		restrict: "E",
		templateUrl: "templates/listBox.html",
		scope: {
			list: "=",
			lists: "=",
			board: "="
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
					scope.cardData = {};
					scope.createMode = false;
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