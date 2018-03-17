angular.module('breakdownAppControllers').controller('FriendsController', [
  '$scope',
  '$filter',
  '$location',
  '$window',
  '$q',
  'userData',
  'toaster',
  'matchUtils',
  function (
    $scope, $filter, $location, $window, $q, userData, toaster, matchUtils
  ) {
    var userId = $location.absUrl().match(/\/User\/(\d+)#/)[1]

    var _obContextInfo = $window._obContextInfo
    $scope.deletable =
      _obContextInfo &&
      _obContextInfo.currentUserSteamId &&
      _obContextInfo.currentUserSteamId === _obContextInfo.userSteamId

    $scope.removeFriend = function (friendId) {
      var friendName = $scope.friends[friendId].username

      userData.removeFriend(userId, friendId)
        .then(function () {
          delete $scope.friends[friendId]
          toaster.pop(
            'success',
            'Success',
            `Removed ${friendName} from your friends list`)
        },
        function () {
          toaster.pop(
            'error',
            'Error',
            `Unable to remove ${friendName} from friends list`)
        })
    }

    userData.getFriends(userId)
      .then(function (response) {
        $scope.username = response.data.username

        if (response.data.friends.length === 0) {
          $scope.message = 'You have no friends =(.'
        } else {
          $scope.friends = {}

          for (var i = 0; i < response.data.friends.length; i++) {
            var friend = response.data.friends[i]
            $scope.friends[friend.steamID] = friend
          }

          var promises = []
          var friendId

          for (friendId in $scope.friends) {
            promises.push(userData.getUserInfo(friendId))
          }

          $q.all(promises).then(function (detailResponses) {
            if (detailResponses === null) {
              return
            }

            for (var i = 0; i < detailResponses.length; i++) {
              var friendDetails = detailResponses[i]

              if (friendDetails.status === 204) {
                // friend isn't an operation breakdown user.
                continue
              }

              if (friendDetails.data !== null) {
                $scope.friends[friendDetails.data.steamID] = friendDetails.data
              }
            }
          })

          var matchPromises = []

          for (friendId in $scope.friends) {
            matchPromises.push(userData.getResultsWithFriend(userId, friendId))
          }

          $q.all(matchPromises).then(function (friendMatchSummaries) {
            friendMatchSummaries.map(function (s) {
              if (!s.data || !s.data[0]) {
                return
              }
              var friendId = s.data[0].friend
              $scope.friends[friendId].matches = s.data.map(function (m) {
                return m.match
              })
            })

            // TODO: move?

            var matchResultFilter = function (m) {
              var result = matchUtils.getMatchResult(m)

              if (result === 'Win' || result === 'Tie') {
                return true
              } else {
                return false
              }
            }

            for (friend in $scope.friends) {
              var thisFriend = $scope.friends[friend]

              if (!thisFriend.matches) {
                thisFriend.matchesPlayedTogether = 0
                thisFriend.winRate = 'N/A'
                thisFriend.streak = 'N/A'
                continue
              }

              thisFriend.matchesPlayedTogether = thisFriend.matches.length
              var wins = $filter('filter')(thisFriend.matches, matchResultFilter)

              thisFriend.winRate = ((wins.length / thisFriend.matchesPlayedTogether) * 100).toFixed(1) + '%'

              var currentIndex = thisFriend.matches.length - 1
              var lastMatch = thisFriend.matches[currentIndex]
              var lastResult = matchUtils.getMatchResult(lastMatch)

              var count = 1

              for (var i = currentIndex - 1; i > 0; i--) {
                if (matchUtils.getMatchResult(thisFriend.matches[i]) === lastResult) { // eslint-disable-line
                  count++
                } else {
                  break
                }
              }

              if (lastResult === 'Loss') {
                thisFriend.streak = count * -1
              } else if (lastResult === 'Win') {
                thisFriend.streak = '+' + count
              } else {
                thisFriend.streak = '0'
              }
            }
          })
        }
      })
  },
])
