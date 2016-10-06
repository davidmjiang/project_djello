"use strict";
angular.module('app').directive('editableField', [function(){
	return{
		restrict: "E",
		templateUrl: "templates/editableField.html",
		scope: {
			resource: "=",
			text: "="
		},
		link: function(scope){
			scope.editing = false;
			scope.enableEditing = function(){
				scope.editing = true;
				scope.editableText = scope.text;
			};
			scope.save = function(){
				scope.text = scope.editableText;
				scope.editing = false;
				scope.resource.edit({title: scope.text});
			};
			scope.cancel = function(){
				scope.editing = false;
			};
		}

	};
}]);