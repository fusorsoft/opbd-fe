export default angular.module('aggregateMapDataChartModule', [])
  .directive('aggregateMapDataChart', function () {
    var link = function (scope, elem, attrs) {
      var update = function () {
        var wins = scope.mapData.filter(function (m) {
          return m.result === 'Win'
        })

        var losses = scope.mapData.filter(function (m) {
          return m.result === 'Loss'
        })

        var draws = scope.mapData.filter(function (m) {
          return m.result === 'Draw'
        })

        scope.data = [losses.length, wins.length, draws.length]
      }

      scope.labels = ['Losses', 'Wins', 'Ties']
      scope.colors = ['#cb4848', '#94bd43', '#2b7a7a']
      update()

      scope.$watch('mapData', function () {
        update()
      })
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        mapData: '=',
        chartTitle: '@',
      },
      link: link,
      templateUrl: '/ng-partials/breakdown/Chart-AggregateMapData/aggregateMapDataChart.html',
    }
  }).name
