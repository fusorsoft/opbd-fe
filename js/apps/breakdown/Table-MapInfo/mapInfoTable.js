var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('mapInfoTable', ['$timeout', function($timeout) {

	var link = function(scope, elem, attrs) {

		scope.visibilities = {};
		scope.loadData = {};

		scope.toggleVisiblity = function(key) {
			scope.visibilities[key] = !scope.visibilities[key];

			$timeout(function() {
				scope.loadData[key] = scope.mapData[key];
			}, 500);
			
		};
	};

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
		 	mapData: '<',
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Table-MapInfo/mapInfoTable.html'
	};
}]);

breakdownDirectives.directive('mapSummaryRow', ['Maps', function(Maps) {

	var link = function(scope, elem, attrs) {

		elem.on('click', function() {		
			if (scope.visible !== "false") {
				// something something digest loop causing logic to be inverted....
				$('body').animate({scrollTop: elem.offset().top}, 'slow');
			}
		});

		if (!scope.mapData) { return; }

		scope.total = function(field) {

			total = 0;

			for (var i = 0; i < scope.mapData.length; i++) {
				total += scope.mapData[i][field];
			}

			return total;
		};

		var mapInfo = Maps.GetMapData(scope.map);
        scope.mapName = mapInfo ? mapInfo.prettyName : scope.map;

		scope.wins = scope.mapData.filter(function(m) {
			return m.result === 'Win';
		});

		scope.losses = scope.mapData.filter(function(m) {
			return m.result === 'Loss';
		});

		scope.draws = scope.mapData.filter(function(m) {
			return m.result === 'Draw';
		});

		scope.kda = ((scope.total('kills') + (scope.total('assists') * 0.4)) / scope.total('deaths')).toFixed(2);
		scope.totalADR = (scope.total('totalDamage') / scope.total('totalRoundsPlayed')).toFixed(2);
		
		scope.roundWinRate = ((scope.total('totalRoundWins') / scope.total('totalRoundsPlayed')) * 100).toFixed(2);

		scope.historyDataPoints = [];
		var historyTracker = 0;

		for (var i = 0; i < scope.mapData.length; i++) {
			var thisMatch = scope.mapData[i];

			if (thisMatch.result === "Win") {
				historyTracker++;
			} else if (thisMatch.result === "Loss") {
				historyTracker--;
			}

			scope.historyDataPoints.push({
				match: i,
				differential: historyTracker,
				date: thisMatch.demoDate,
				map: thisMatch.map,
				result: thisMatch.result
			});
		}

		var diffValue = scope.historyDataPoints[scope.historyDataPoints.length - 1].differential;
		scope.differential = diffValue >= 0 ? '+' + diffValue : diffValue;

		var currentIndex = scope.historyDataPoints.length - 1;
		var lastResult = scope.historyDataPoints[currentIndex].result;
		var count = 1;

		for(i = currentIndex - 1; i > 0; i--) {
			if(scope.historyDataPoints[i].result === lastResult) {
				count++;
			} else {
				break;
			}
		}

		scope.streak = count + ' ' + lastResult;

	};

	return {
		restrict: 'A',
		replace: 'true',
		scope: {
			mapData: '<',
			visible: '@',
			map: '@'
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Table-MapInfo/mapSummaryRow.html'
	};
}]);

breakdownDirectives.directive('mapDetailRow', ['Maps', '$timeout', function(Maps, $timeout) {

	var link = function(scope, elem, attrs) {

		var total = function(field) {

			if (!scope.mapData) { return 0; }

			var sum = 0;

			for (var i = 0; i < scope.mapData.data.length; i++) {
				sum += scope.mapData.data[i][field];
			}

			return sum;
		};

		scope.$watch('mapData', function() { 

			var totalRoundsPlayed = total('totalRoundsPlayed');
			var tRoundsPlayed = 	total('tRoundsPlayed');
			var ctRoundsPlayed =	total('ctRoundsPlayed');
			var totalRoundWins = 	total('totalRoundWins');
			var tRoundsWon =		total('tRoundsWon');
			var ctRoundsWon = 		total('ctRoundsWon');
			var kills = 			total('kills');
			var deaths = 			total('deaths');
			var assists = 			total('assists');
			var kda = 				((kills + (assists * 0.4)) / deaths).toFixed(2);
			var totalADR  = 		(total('totalDamage') / totalRoundsPlayed).toFixed(2);
			var tADR  = 			(total('tSideTotalDamage') / tRoundsPlayed).toFixed(2);
			var ctADR  = 			(total('ctSideTotalDamage') / ctRoundsPlayed).toFixed(2);
			var roundWinRate  = 	((totalRoundWins / totalRoundsPlayed) * 100).toFixed(2);
			var tRoundWinRate  = 	((tRoundsWon / tRoundsPlayed) * 100).toFixed(2);
			var ctRoundWinRate  = 	((ctRoundsWon / ctRoundsPlayed) * 100).toFixed(2);


			scope.totals = {
				kills: 	kills,
				deaths: deaths,
				assists: assists,
				kda : kda,
				totalADR : totalADR,
				tADR : tADR,
				ctADR : ctADR,
				roundWinRate : roundWinRate,
				tRoundWinRate : tRoundWinRate,
				ctRoundWinRate : ctRoundWinRate,
				totalRoundsPlayed: totalRoundsPlayed,
				tRoundsPlayed: tRoundsPlayed,
				ctRoundsPlayed: ctRoundsPlayed,
				totalRoundWins: totalRoundWins,
				tRoundsWon: tRoundsWon,
				ctRoundsWon: ctRoundsWon
			};
		});

		var mapInfo = Maps.GetMapData(scope.map);

		scope.mapIcon = mapInfo ? mapInfo.medIconUrl : "";
	};

	return {
		restrict: 'A',
		replace: 'true',
		scope: {
			mapData: '=',
			map: '@',
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Table-MapInfo/mapDetailRow.html'
	};
}]);