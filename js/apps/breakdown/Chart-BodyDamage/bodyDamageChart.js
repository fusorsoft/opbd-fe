import angular from 'angular'
import bodyDamageChartTemplate from './bodyDamageChart.html'

export default angular.module('bodyDamageChartModule', [])
  .directive('bodyDamageChart', function () {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        w: '=weaponDamageData',
        bodyImageUrl: '@bodyImageUrl',
      },
      template: bodyDamageChartTemplate,
    }
  }).name
