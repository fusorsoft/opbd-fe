var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('historyDataChart', ['$filter', '$window', function($filter, $window) {

	var link = function(scope, element, attrs) {

		scope.selectedData = "DifferentialOverTime";
		var emptyTitle = function() { return ""; };

		scope.onClick = function(points, evt) {

			if (points.length > 0) {
				var firstPoint = points[0];
				var dataIndex = firstPoint._index;
				var datum = scope.historyData[scope.selectedData].matchIds[dataIndex];
				
				$window.location.href = "#/MatchData/" + datum;
			}
		};

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
				yAxes: [{
					ticks: {
						maxTicksLimit: 5
					}
				}]
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
			tooltips: {
				callbacks: {
					title: function(items, data) {
						var i = items[0].index;
						return scope.historyData[scope.selectedData].titleFn(i);
					},
					label: function(item, data) {
						var i = item.index;
						return scope.historyData[scope.selectedData].labelFn(i);
					}
				}
			}
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