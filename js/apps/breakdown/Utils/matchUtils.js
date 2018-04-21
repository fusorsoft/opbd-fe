export default function () {
  var getWinsFromMatch = function (match) {
    var d = match.playerData[0]
    return d.TotalWins
  }

  var getOpponentWinsFromMatch = function (match) {
    var d = match.playerData[0]
    return d.TotalRoundsPlayed - d.TotalWins
  }

  var getMatchResult = function (match) {
    var wins = getWinsFromMatch(match)
    var oppWins = getOpponentWinsFromMatch(match)

    return getResult(wins, oppWins)
  }

  var getResult = function (wins, oppWins) {
    if (wins > oppWins) {
      return 'Win'
    } else if (wins < oppWins) {
      return 'Loss'
    } else {
      return 'Tie'
    }
  }

  return {
    getMatchResult: getMatchResult,
  }
}
