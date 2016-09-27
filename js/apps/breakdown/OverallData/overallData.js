var breakdownControllers = angular.module('breakdownAppControllers');

breakdownControllers.controller('OverallDataController', [
	'$scope',
	'$routeParams',
	'$filter',
	'$location',
	'$window',
	'$sce',
	'$timeout',
	'Maps',
	'matchData',
	function($scope, $routeParams, $filter, $location, $window, $sce, $timeout, maps, matchData) {

		$scope.matchdata = [];

		var userId = $location.absUrl().match(/\/User\/(\d+)\#/)[1];

		var dummyMatches = [];

		for (var i = 0; i < 4; i++) {
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

			if(response.length === 0) {
				if ($window._obContextInfo.currentUserSteamId === userId) {
					// current logged in user viewing their own data
					$scope.warningMessage = "You don't have any data!  <a href='/Client'>Get The Client</a> and get started!";
				} else {
					// no data for user being viewed, but it's not the current user
					$scope.warningMessage = "This user has no data.  If you played with this user, <a href='/Client'>Get The Client</a> and help them out.";
				}

				return;
			}

			$scope.matchdata = response;
			$scope.playerName = $scope.matchdata[$scope.matchdata.length - 1].name;
			$scope.rank = $scope.matchdata[$scope.matchdata.length - 1].finalRank;

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
			var headshotKillDataPoints = [];
			var headshotRateDataPoints = [];
			var accuracyDataPoints = [];
			var matchDates = [];
			var matchMaps = [];
			var matchIds = [];

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

				// per-map differential breakdown...
				mapData.historyData.push({
					differential: s.currentDiff,
					result: thisMatch.result,
					date: thisMatch.demoDate
				});

				// overall stats
				matchDates.push(thisMatch.demoDate);
				matchMaps.push(thisMatch.map);
				matchIds.push(thisMatch.matchId);

				historyDataPoints.push({
					differential: historyTracker,
					result: thisMatch.result
				});

				adrDataPoints.push({
					adr: thisMatch.adr,
					tadr: thisMatch.tSideAdr,
					ctadr: thisMatch.ctSideAdr,
				});

				// Weapon data over time...

				var headshots = thisMatch.weaponData.reduce(function(a, b) {
					return a + b.HeadShots;
				}, 0);

				var shotsHit = thisMatch.weaponData.reduce(function(a, b) {
					return a + b.ShotsHit;
				}, 0);

				var shotsFired = thisMatch.weaponData.reduce(function(a, b) {
					return a + b.ShotsFired;
				}, 0);

				var headshotKills = thisMatch.weaponData.reduce(function(a, b) {
					return a + b.HeadshotKills;
				}, 0);

				var headshotKillRate = Math.round((headshotKills / thisMatch.kills) * 100, 0);
				var headshotRate = Math.round((headshots / shotsHit) * 100, 0);
				var accuracy = Math.round((shotsHit / shotsFired) * 100, 0);

				headshotKillDataPoints.push({
					rate: headshotKillRate,
				});

				headshotRateDataPoints.push({
					rate: headshotRate,
				});

				accuracyDataPoints.push({
					accuracy: accuracy,
				});
			}
		
			var historyDataField = function(rawData, pointField, series, labelFn) {
				var self = this;
				self.labels = matchDates;
				self.matchMaps = matchMaps;
				self.matchIds = matchIds;
				self.titleFn = function(index) { return maps.GetMapData(matchMaps[index]).prettyName; };
				self.labelFn = labelFn;
				self.rawData = rawData;
				self.data = rawData.map(function(d) { return d[pointField]; });
				self.series = series;
			};


			$scope.historyData = {};
			$scope.historyData.ADROverTime = new historyDataField(adrDataPoints, "adr", "ADR", function(index) {
				return [
					"Date: " + this.labels[index],
					"ADR: " + this.rawData[index].adr, 
					"CT ADR: " + this.rawData[index].ctadr,
					"T ADR: " + this.rawData[index].tadr
				];
			});
			
			$scope.historyData.DifferentialOverTime = new historyDataField(historyDataPoints, "differential", "Win/Loss Differential", function(index) {
				return [
					"Date: " + this.labels[index],
					"Differential: " + (this.data[index] > 0 ? "+" + this.data[index] : this.data[index])
				];
			});

			$scope.historyData.HeadshotKillsOverTime  = new historyDataField(headshotKillDataPoints, "rate", "Headshot Kill Rate", function(index) {
				return [
					"Date: " + this.labels[index],
					"Rate: " + this.data[index] + "%"
				];
			});

			$scope.historyData.HeadshotRateOverTime = new historyDataField(headshotRateDataPoints, "rate", "Headshot Rate", function(index) {
				return [
					"Date: " + this.labels[index],
					"Rate: " + this.data[index] + "%"
				];
			});

			$scope.historyData.AccuracyOverTime = new historyDataField(accuracyDataPoints, "accuracy", "Accuracy", function(index) {
				return [
					"Date: " + this.labels[index],
					"Accuracy: " + this.data[index] + "%"
				];
			});

			var total = function(field) {
				return $scope.matchdata.reduce(function(a, b) {
					return a + b[field];
				}, 0);
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