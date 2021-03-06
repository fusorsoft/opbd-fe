import angular from 'angular'
import adrChartTemplate from './adrChart.html'

export default angular.module('adrChart', [])
  .directive('adrChart', function () {
    var link = function (scope, elem, attrs) {
      scope.labels = [['T'], ['CT'], ['Overall']]
      scope.series = [['T ADR'], ['CT ADR'], ['ADR']]
      scope.colors = ['#ffcc66', '#4169e1', '#cecece']

      scope.data = scope.adrData

      scope.options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      }
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        adrData: '<',
        chartTitle: '@',
      },
      link: link,
      template: adrChartTemplate,
    }
  }).name
