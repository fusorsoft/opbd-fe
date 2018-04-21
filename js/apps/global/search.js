export default angular.module('searchControllerModule')
  .controller('searchController', [
    '$http',
    '$scope',
    '$window',
    function ($http, $scope, $window) {
      $scope.searchTerm = ''

      $scope.autocompleteValues = []

      $scope.onQueryModified = function () {
        if ($scope.searchTerm.length < 2) {
          return
        }

        $http.get('/_api/matchdata/players?query=' + $scope.searchTerm + '&limit=5').then(function (data) {
          var info = data.data.map(function (d) {
            return {
              'label': d.name + ' (' + d.count + ' matches)',
              'value': d.steamId,
            }
          })

          $scope.autocompleteValues = info
        },
        function (err) {
          console.log('error:\n' + err)
        })
      }

      $scope.onItemSelected = function (selectedItem) {
        $window.location.href = '/User/' + $scope.autocompleteValues[selectedItem].value
      }
    },
  ]).name
