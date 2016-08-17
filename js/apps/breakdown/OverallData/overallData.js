var breakdownControllers = angular.module('breakdownAppControllers');

breakdownControllers.controller('OverallDataController', [
	'$scope',
	'$routeParams',
	'$filter',
	'$location',
	'$window',
	'$timeout',
	'matchData',
	function($scope, $routeParams, $filter, $location, $window, $timeout, matchData) {
		$scope.matchdata = [];

		var userId = $location.absUrl().match(/\/User\/(\d+)\#/)[1];

		var dummyMatches = [];

		for (var i = 0; i < 5; i++) {
			dummyMatches.push({
				totalRoundWins: 0,
				totalRoundsPlayed: 0,
				map: '-',
				demoDate: new Date(),
				adr: 0.0,
				matchId: '-',
				result: '-'
			});
		}

		$scope.recentMatches = dummyMatches;

		matchData.getUserSummary(userId).then(function(response) {

			/* NOTE:
	
			A LOT of the code here has to do with some aggressive optimization.  This page has so much shit going on
			that it really needed it...

			*/

			$scope.matchdata = response;
			$scope.playerName = $scope.matchdata[$scope.matchdata.length - 1].name;

			var last5Matches = $scope.matchdata.slice(-5).reverse();

			var handleMediaMatch = function(mql) {
				if (!mql.matches) {
					$scope.recentMatches = last5Matches;
				} else {
					$scope.recentMatches = last5Matches.slice(0, 4);
				}
			};

			if ($window.matchMedia) {
				var mql = $window.matchMedia('screen and (max-width: 1565px)');
				mql.addListener(handleMediaMatch);
				handleMediaMatch(mql);
			} else {
				$scope.recentMatches = last5Matches;
			}

			var historyDataPoints = [];
			var historyTracker = 0;
			$scope.mapData = {};
			var shadowData = {};

			var adrDataPoints = [];

			for (var i = 0; i < $scope.matchdata.length; i++) {
				var thisMatch = $scope.matchdata[i];

				if (!$scope.mapData.hasOwnProperty(thisMatch.map)) {
					$scope.mapData[thisMatch.map] = {};
					$scope.mapData[thisMatch.map].map = thisMatch.map;	//lulz
					$scope.mapData[thisMatch.map].data = [];
					$scope.mapData[thisMatch.map].historyData = [];
				}

				if (!shadowData.hasOwnProperty(thisMatch.map)) {
					shadowData[thisMatch.map] = {};
					shadowData[thisMatch.map].currentDiff = 0;
					shadowData[thisMatch.map].currentIndex = 0;
				}

				var mapData = $scope.mapData[thisMatch.map];
				var s = shadowData[thisMatch.map];
				s.currentIndex++;
				mapData.data.push(thisMatch);

				if (thisMatch.result === "Win") {
					historyTracker++;
					s.currentDiff++;
				} else if (thisMatch.result === "Loss") {
					historyTracker--;
					s.currentDiff--;
				}

				historyDataPoints.push({
					match: i,
					differential: historyTracker,
					date: thisMatch.demoDate,
					map: thisMatch.map,
					result: thisMatch.result
				});

				mapData.historyData.push({
					match: s.currentIndex,
					differential: s.currentDiff,
					date: thisMatch.demoDate,
					map: thisMatch.map,
					result: thisMatch.result
				});

				adrDataPoints.push({
					match: i,
					date: thisMatch.demoDate,
					adr: thisMatch.adr,
					tadr: thisMatch.tSideAdr,
					ctadr: thisMatch.ctSideAdr,
					map: thisMatch.map
				});
			}

			$scope.adrOverTimeData = adrDataPoints;

			$scope.matchHistoryData = historyDataPoints;

			var total = function(field) {
				sum = 0;

				for (var i = 0; i < $scope.matchdata.length; i++) {
					sum += $scope.matchdata[i][field];
				}

				return sum;
			};

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


			$scope.totals = {
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


		}, function(err) {
			console.log(err.message);
		});
	}
]);