var obWidgets = angular.module('opBreakdownWidgets');

obWidgets.directive('obTypeahead', function() {

	var link = function(scope, elem, attrs) {
		scope.focusIndex = -1;

		scope.$watch('searchTerm', function() {
			scope.focusIndex = -1;
			scope.modifiedFn();
		});

		scope.onMouseOver = function(index) {
			scope.focusIndex = index;
		};

		scope.onClick = function(index) {
			scope.selectedFn(index);
		};

		var keys = [];

		keys.push({code: 40, action: function() { if (scope.focusIndex < scope.searchData.length - 1) { scope.focusIndex++; }}});
		keys.push({code: 38, action: function() { if (scope.focusIndex > 0) { scope.focusIndex--; }}});
		keys.push({code: 27, action: function() { scope.focusIndex = -1; scope.searchTerm = ''; scope.searchData = []; }});
		keys.push({code: 13, action: function() { scope.selectedFn(scope.focusIndex); }});

		var searchBox = elem.find('input:first');

		searchBox.bind('focus', function() {
			elem.bind('keydown', function(event) {
				
				keys.forEach(function(k) {
					if (event.keyCode !== k.code) { return; }		

					k.action();
					scope.$apply();
				});
			});
		});

		searchBox.bind('blur', function() {
			elem.unbind('keydown');
			scope.focusIndex = -1;
			scope.$apply();
		});

	};

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
			searchTerm: '=',
			searchData: '<',
			resultLimit: '@',
			modifiedFn: '&',
			selectedFn: '='
		},
		link: link,
		templateUrl: '/ng-partials/global/Widget-Typeahead/typeaheadWidget.html'
	};
});