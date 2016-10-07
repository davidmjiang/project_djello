//pass in the resource, the text and the attribute. this requires the resource to have an edit function
"use strict";
angular.module('app').directive('editableField', [function(){
	return{
		restrict: "AE",
		templateUrl: "templates/editableField.html",
		transclude: true,
		scope: {
			resource: "=",
			text: "=",
			attr: "="
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
				var hash = {};
				hash[scope.attr] = scope.text;
				scope.resource.edit(hash);
			};
			scope.cancel = function(){
				scope.editing = false;
			};
		}

	};
}]);