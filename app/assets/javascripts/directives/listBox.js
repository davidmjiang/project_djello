"use strict";
angular.module('app').directive('listBox', ['ListService', function(ListService){
	return{
		restrict: "E",
		templateUrl: "templates/listBox.html",
		scope: {
			list: "=",
			lists: "=",
			board: "="
		},
		link: function(scope){
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