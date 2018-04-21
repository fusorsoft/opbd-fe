export default function ($http, apiHelpers) {
  var addFriend = function (friendId, name) {
    return new Promise((resolve, reject) => {
      $http.get('/_api/users').then(function (me) {
        // this is just loltastic....

        const request = {
          method: 'POST',
          url: '/_api/users/' + me.data.steamID + '/friends',
          headers: {
            'Content-Type': 'application/json',
          },
          data: angular.toJson({
            steamId: friendId,
            name: name,
          }),
        }

        $http(request).then(function (resp) {
          resolve(resp)
        },
        function (err) {
          reject(err)
        }
        )
      })
    })
  }

  var removeFriend = function (userId, friendId) {
    return apiHelpers.simpleDeleteQuery('/_api/users/' + userId + '/friends/' + friendId)
  }

  var getFriends = function (userId) {
    return apiHelpers.simpleGetQuery('/_api/users/' + userId + '/friends')
  }

  var getResultsWithFriend = function (userId, friendId) {
    return apiHelpers.simpleGetQuery('/_api/matchdata/summary/user/' + userId + '?with=' + friendId)
  }

  var getUserInfo = function (userId) {
    return apiHelpers.simpleGetQuery('/_api/users/' + userId)
  }

  return {
    addFriend: addFriend,
    removeFriend: removeFriend,
    getFriends: getFriends,
    getResultsWithFriend: getResultsWithFriend,
    getUserInfo: getUserInfo,
  }
}
