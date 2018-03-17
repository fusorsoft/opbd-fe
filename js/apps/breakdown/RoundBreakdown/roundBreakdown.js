var breakdownDirectives = angular.module('breakdownDirectives')

breakdownDirectives.directive('roundBreakdown', function () {
  var controller = ['$scope', function ($scope) {
    $scope.range = function (n) {
      return new Array(n)
    }

    $scope.getRoundBreakdownCellClass = function (team, outcome) {
      if (outcome === 'Loss') {
        return ''
      } else {
        if (team === 'CT') {
          return 'ctWin'
        } else {
          return 'tWin'
        }
      }
    }
  }]

  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      playerData: '=playerData',
    },
    controller: controller,
    templateUrl: '/ng-partials/breakdown/RoundBreakdown/roundBreakdown.html',
  }
})
