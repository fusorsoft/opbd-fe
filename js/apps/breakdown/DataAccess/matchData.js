export default function ($http, $filter, Ranks) {
  var addMatchData = function (data) {
    var request = {
      method: 'POST',
      url: '/_api/matchData',
      headers: {
        'Content-Type': 'application/json',
      },
      data: angular.toJson(data),
    }

    return $http(request)
  }

  var getSummaryData = function (url) {
    return new Promise((resolve, reject) => {
      $http.get(url).then(function (response) {
        var rawData = response.data.map(function (d) {
          var userData = d.playerData[0]
          return {
            name: userData.Name,
            matchId: d._id,
            demoDate: d.demoFileMetadata.Created,
            map: d.matchMetadata.MapName,
            userScore: userData.TotalWins,
            opponentScore: userData.TotalRoundsPlayed - userData.TotalWins,
            result: getResult(
              userData.TotalWins,
              userData.TotalRoundsPlayed - userData.TotalWins
            ),
            kills: userData.DamageTotals.Kills,
            deaths: userData.DamageTotals.Deaths,
            assists: userData.DamageTotals.Assists,
            adr: userData.ADR,
            initialRank: Ranks.getRankData(userData.InitialRank),
            finalRank: Ranks.getRankData(userData.FinalRank),
            steamId: userData.SteamID,
            matchTeam: userData.MatchTeam,
            mvps: userData.MVPs,
            tSideAdr: userData.TSideADR,
            ctSideAdr: userData.CTSideADR,

            totalDamage: userData.DamageTotals.TotalDamage,
            tSideTotalDamage: userData.TSideDamageTotals.TotalDamage,
            ctSideTotalDamage: userData.CTSideDamageTotals.TotalDamage,
            totalRoundWins: userData.TotalWins,
            totalRoundsPlayed: userData.TotalRoundsPlayed,
            tRoundsPlayed: userData.TRoundsPlayed,
            ctRoundsPlayed: userData.CTRoundsPlayed,
            tRoundsWon: userData.TWins,
            ctRoundsWon: userData.CTWins,

            weaponData: userData.WeaponData,
          }
        })

        var orderedSummaryData = $filter('orderBy')(rawData, 'demoDate')

        resolve(orderedSummaryData)
      }, function (err) {
        reject(err)
      })
    })
  }

  // All Matches For User
  var getUserSummary = function (userId) {
    return getSummaryData('/_api/matchData/summary/user/' + userId)
  }

  // All users in match
  var getMatchSummary = function (matchId) {
    return getSummaryData('/_api/matchData/summary/match/' + matchId)
  }

  var getResult = function (userScore, opponentScore) {
    if (userScore > opponentScore) {
      return 'Win'
    } else if (opponentScore > userScore) {
      return 'Loss'
    } else {
      return 'Draw'
    }
  }

  var getMatchDetail = function (matchId) {
    return $http.get('/_api/matchData/details/' + matchId)
  }

  return {
    addMatchData: addMatchData,
    getUserSummary: getUserSummary,
    getMatchSummary: getMatchSummary,
    getMatchDetail: getMatchDetail,
  }
}
