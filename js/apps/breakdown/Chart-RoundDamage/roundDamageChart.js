import angular from 'angular'
import roundDamageChartTemplate from './roundDamageChart.html'

export default angular.module('roundDamageChartModule', [])
  .directive('roundDamageChart', function () {
    var link = function (scope, elem, attrs) {
      scope.data = scope.roundDamageData.map(function (r) {
        return r.totalDamageDealt
      })

      scope.labels = scope.roundDamageData.map(function (r) {
        return r.round
      })

      scope.series = ['Round Damage']
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        roundDamageData: '=',
        chartTitle: '@',
      },
      link: link,
      template: roundDamageChartTemplate,
    }
  }).name
