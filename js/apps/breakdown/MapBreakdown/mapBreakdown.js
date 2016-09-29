var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('mapBreakdown', ['Maps', function(Maps) {

	var link = function(scope, elem, attrs) {

		var getMapData = function(map) {
			return Maps.GetMapData(map.map);
		};

		var sortMapsByMatchesPlayed = function(a, b) {
			return a.data.length - b.data.length;
		};

		var total = function(field) {
			return scope.selectedMapData.data.reduce(function (a,b) { return a + b[field]; }, 0);
		};

		var updateData = function(map) {
			scope.selectedMapData = scope.mapData[scope.selectedMap];
			scope.selectedMapInfo = Maps.GetMapData(map);

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
			var wins = 				scope.selectedMapData.data.filter(function(m) { return m.result == "Win"; }).length;
			var losses = 			scope.selectedMapData.data.filter(function(m) { return m.result == "Loss"; }).length;
			var ties = 				scope.selectedMapData.data.filter(function(m) { return m.result == "Draw"; }).length;

			scope.differential = scope.selectedMapData.historyData.slice(-1)[0].differential;

			var currentIndex = scope.selectedMapData.historyData.length - 1;
			var lastResult = scope.selectedMapData.historyData[currentIndex].result;
			var count = 1;

			for(i = currentIndex - 1; i > 0; i--) {
				if(scope.selectedMapData.historyData[i].result === lastResult) {
					count++;
				} else {
					break;
				}
			}

			scope.streak = count + ' ' + lastResult;


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
				ctRoundsWon: ctRoundsWon,
				wins: wins,
				losses: losses,
				ties: ties,
			};
		};


		var arrMaps = [];
		for (var m in scope.mapData) {
			arrMaps.push(scope.mapData[m]);
		}

		var sortedByTimesPlayed = arrMaps.sort(sortMapsByMatchesPlayed);
		scope.mostPlayedMaps = sortedByTimesPlayed.slice(-7).reverse().map(getMapData);
		scope.otherMaps = arrMaps.length > 7 ? sortedByTimesPlayed.slice(0, arrMaps.length - 7).reverse().map(getMapData) : null;

		scope.selectedMap = scope.mostPlayedMaps[0].name; // select top map initially
		updateData(scope.selectedMap);

		scope.mapClick = function(map) {
			scope.selectedMap = map;
			updateData(map);
		};
	};
	
	return {
		restrict: 'E',
		replace: 'true',
		scope: {
		 	mapData: '<',
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/MapBreakdown/mapBreakdown.html'
	};
}]);