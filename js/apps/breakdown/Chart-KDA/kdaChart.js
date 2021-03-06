import angular from 'angular'
import kdaChartTemplate from './kdaChart.html'

export default angular.module('kdaChartModule', [])
  .directive('kdaChart', function () {
    var link = function (scope, elem, attrs) {
      scope.labels = ['Kills', 'Deaths', 'Assists']
      scope.series = ['Terrorists', 'Counter Terrorists']

      scope.data = scope.kdaData
      scope.colors = ['#ffcc66', '#4169e1']

      scope.options = {
        scales: {
          yAxes: [{
            stacked: true,
          }],
          xAxes: [{
            stacked: true,
          }],
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      }
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        kdaData: '=',
        chartTitle: '@',
      },
      link: link,
      template: kdaChartTemplate,
    }
  }).name
