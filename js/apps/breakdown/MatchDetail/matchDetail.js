import angular from 'angular'

export default angular.module('matchDetailModule', [])
  .controller('MatchDetailController', [
    '$scope',
    '$location',
    '$route',
    '$timeout',
    '$window',
    'matchData',
    'Ranks',
    'Maps',
    function (
      $scope, $location, $route, $timeout, $window, matchData, Ranks, Maps
    ) {
      var matchId = $route.current.params.matchId

      $scope.demoFileMetadata = {}
      $scope.matchMetadata = {}
      $scope.playerData = {}
      $scope.corroboratorCount = 0
      $scope.mapIcon = ''
      $scope.mapInfo = {}

      $scope.matchdata = [
        {name: 'Player', matchTeam: 'Team 1', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 1', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 1', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 1', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 1', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 2', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 2', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 2', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 2', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
        {name: 'Player', matchTeam: 'Team 2', steamid: '1', adr: 0.0, kills: 0, deaths: 0, assists: 0, mvps: 0},
      ]

      matchData.getMatchDetail(matchId).then(function (response) {
        $scope.demoFileMetadata = response.data.demoFileMetadata
        $scope.matchMetadata = response.data.matchMetadata
        $scope.playerData = response.data.playerData[0]
        $scope.breakdownMetadata = response.data.breakdownMetadata
        $scope.corroboratorCount =
          response.data.breakdownMetadata.corroborators.length
        $scope.mapInfo = Maps.getMapData($scope.matchMetadata.MapName)

        $timeout(function () {
          // wait for digest cycle to finish before transitioning background
          $scope.screenshot = $scope.mapInfo.screenshot
        }, 0)

        matchData.getMatchSummary($scope.breakdownMetadata.breakdownMatchId)
          .then(function (data) {
            $scope.matchdata = data

            var sumRanks = 0
            var numRankedPlayers = 0

            data.map(function (userData) {
              if (userData.finalRank) {
                sumRanks += userData.finalRank.Rank
                numRankedPlayers++
              }
            })

            var avgRank = Math.round(sumRanks / numRankedPlayers)
            $scope.averageRank = Ranks.getRankData(avgRank)
            $scope.$digest()
          })

        $scope.weaponDamageData = $scope.playerData.WeaponData.map(function (p) {
          return {
            weapon: p.Weapon,
            damage: p.TotalDamage,
          }
        })

        $scope.kdaData = [
          [
            $scope.playerData.TSideDamageTotals.Kills,
            $scope.playerData.TSideDamageTotals.Deaths,
            $scope.playerData.TSideDamageTotals.Assists,
          ],

          [
            $scope.playerData.CTSideDamageTotals.Kills,
            $scope.playerData.CTSideDamageTotals.Deaths,
            $scope.playerData.CTSideDamageTotals.Assists,
          ],
        ]

        $scope.adrData = [
          $scope.playerData.TSideADR,
          $scope.playerData.CTSideADR,
          $scope.playerData.ADR,
        ]

        var getNumRoundsForKillCount = function (i) {
          var c = 0

          for (var r in $scope.playerData.RoundData) {
            if ($scope.playerData.RoundData[r].DamageData.Kills === i) {
              c++
            }
          }

          return c
        }

        $scope.killCountData =
        [
          { label: 'skunk', value: getNumRoundsForKillCount(0) },
          { label: '1k', value: getNumRoundsForKillCount(1) },
          { label: '2k', value: getNumRoundsForKillCount(2) },
          { label: '3k', value: getNumRoundsForKillCount(3) },
          { label: '4k', value: getNumRoundsForKillCount(4) },
          { label: 'Ace', value: getNumRoundsForKillCount(5) },
        ]

        var roundDamages = []

        for (var r in $scope.playerData.RoundData) {
          var ddata = $scope.playerData.RoundData[r].DamageData

          roundDamages.push({
            round: parseInt(r),
            totalDamageDealt: ddata.TotalDamage,
            healthDamage: ddata.HealthDamage,
            armorDamage: ddata.ArmorDamage,
            economicDamage: ddata.EconomicDamage,
          })
        }

        $scope.roundDamageData = roundDamages
        $timeout(() => $scope.$digest())
      })
    }]
  ).name
