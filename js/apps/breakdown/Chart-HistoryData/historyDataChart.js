var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('historyDataChart', ['$filter', function($filter) {

	var link = function(scope, element, attrs) {

		scope.selectedData = "DifferentialOverTime";

		scope.historyChartOptions = {
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						maxTicksLimit: 20
					}
				}],
			},
			elements: {
				point: {
					radius: 2,
					hitRadius: 3,
				}
			},
			legend: {
				display: false
			},
		};

	};

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
			historyData: '<',
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Chart-HistoryData/historyDataChart.html'
	};
}]);