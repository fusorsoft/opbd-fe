var breakdownDirectives = angular.module('breakdownDirectives')

breakdownDirectives.directive('killCountChart', function () {
  var link = function (scope, elem, attrs) {
    scope.series = ['Kill Counts']
    scope.colors = ['#170000', '#6F0001', '#DC1908', '#EFA50B', '#F2FF28', '#FEFFFC']

    scope.data = scope.killCountData.map(function (k) {
      return k.value
    })

    scope.labels = scope.killCountData.map(function (k) {
      return k.label
    })
  }

  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      killCountData: '=',
      chartTitle: '@',
    },
    link: link,
    templateUrl: '/ng-partials/breakdown/Chart-KillCounts/killCountChart.html',
  }
})
