export default angular.module('topUsersControllerModule', [])
  .controller('topUsersController', [
    '$http',
    '$window',
    '$scope',
    'toaster',
    function ($http, $window, $scope, toaster) {
      var getDummyUser = function () {
        return {
          user: {
            avatarMedium: '/images/ctlogo64.png',
          },
          name: [
            'User',
          ],
          count: 0,
        }
      }

      $scope.topUsers = []
      for (var i = 0; i < 5; i++) { $scope.topUsers.push(getDummyUser()) }

      $http.get('/_api/users/top?limit=5').then(function (data) {
        $scope.topUsers = data.data
      }, function () {
        // replace with toaster pop
        // alert(err);
      })
    },
  ]).name
