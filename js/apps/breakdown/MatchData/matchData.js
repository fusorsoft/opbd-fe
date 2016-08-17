var breakdownControllers = angular.module('breakdownAppControllers');

breakdownControllers.controller('MatchDataController', [
	'$scope',
	'$location',
	'$filter',
	'Ranks',
	'matchData',
	function($scope, $location, $filter, rankDataFactory, matchData) {
		$scope.matchdata = [];

		var userId = $location.absUrl().match(/\/User\/(\d+)\#/)[1];

		$scope.outcomeCellClass = function(outcome) {
			switch (outcome) {
				case 'Win':
					return 'ob-win';
				case 'Loss':
					return 'ob-loss';
				case 'Draw':
					return 'ob-draw';
			}
		};

		matchData.getUserSummary(userId).then(function(data) {
			$scope.playerName = data[0].name;
			$scope.matchdata = data;

			var historyDataPoints = [];
			var historyTracker = 0;

			for (var i = 0; i < $scope.matchdata.length; i++) {
				var thisMatch = $scope.matchdata[i];

				if (thisMatch.result === "Win") {
					historyTracker++;
				} else if (thisMatch.result === "Loss") {
					historyTracker--;
				}

				historyDataPoints.push({
					match: i,
					differential: historyTracker,
					date: thisMatch.demoDate,
					map: thisMatch.map,
					result: thisMatch.result
				});
			}

			$scope.matchHistoryData = historyDataPoints;

		}, function(err) {
			console.log(err.message);
		});
	}
]);