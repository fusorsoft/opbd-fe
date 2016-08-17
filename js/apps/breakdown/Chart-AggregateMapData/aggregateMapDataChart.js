var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('aggregateMapDataChart', function() {

	var link = function(scope, elem, attrs) {

		var wins = scope.mapData.filter(function(m) {
			return m.result === 'Win';
		});

		var losses = scope.mapData.filter(function(m) {
			return m.result === 'Loss';
		});

		var draws = scope.mapData.filter(function(m) {
			return m.result === 'Draw';
		});

		scope.labels = ["Losses", "Wins",  "Ties"];
		scope.data = [losses.length, wins.length, draws.length];
		scope.colors = ["#cb4848", "#94bd43", "#2b7a7a"];
	};

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
			mapData: '=',
			chartTitle: '@	'
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Chart-AggregateMapData/aggregateMapDataChart.html'
	};
});