var breakdownDirectives = angular.module('breakdownDirectives')

breakdownDirectives.directive('adrOverTimeChart', ['$filter', function ($filter) {
  var link = function (scope, element, attrs) {
    scope.labels = scope.adrOverTimeData.map(function (d) {
      return $filter('date')(d.date, 'M-dd-yy')// match;
    })

    scope.data = scope.adrOverTimeData.map(function (d) {
      return d.adr
    })

    scope.series = ['ADR Over Time']

    scope.options = {
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 4,
          },
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 20,
          },
        }],
      },
      elements: {
        point: {
          radius: 1,
          hitRadius: 3,
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          title: function (items, data) {
            var index = items[0].index
            var adrOverTimeItem = scope.adrOverTimeData[index]
            return adrOverTimeItem.map
          },
          label: function (item, data) {
            var index = item.index
            var adrOverTimeItem = scope.adrOverTimeData[index]
            return [
              $filter('date')(adrOverTimeItem.date, 'MMM dd, yyyy'),
              'ADR: ' + adrOverTimeItem.adr,
            ]
          },
        },
      },
    }
  }

  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      adrOverTimeData: '=',
      chartTitle: '@',
    },
    link: link,
    templateUrl: '/ng-partials/breakdown/Chart-ADROverTime/adrOverTimeChart.html',
  }
}])
