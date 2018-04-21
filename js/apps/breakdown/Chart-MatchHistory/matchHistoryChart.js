export default angular.module('matchHistoryChartModule', [])
  .directive('matchHistoryChart', ['$filter', function ($filter) {
    var link = function (scope, element, attrs) {
      var updateData = function () {
        scope.labels = scope.matchHistoryData.map(function (d) {
          return $filter('date')(d.date, 'M-dd-yy')// d.match;
        })

        scope.data = scope.matchHistoryData.map(function (d) {
          return d.differential
        })
      }

      updateData()

      scope.$watch('matchHistoryData', function () {
        updateData()
      })

      scope.series = ['Win/Loss Differential']

      scope.options = {
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
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
            radius: 2,
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
              var mapHistoryItem = scope.matchHistoryData[index]
              return mapHistoryItem.map
            },
            label: function (item, data) {
              var index = item.index
              var mapHistoryItem = scope.matchHistoryData[index]
              return [
                $filter('date')(mapHistoryItem.date, 'MMM dd, yyyy'),
                'Differential: ' + (mapHistoryItem.differential >= 0 ? '+' + mapHistoryItem.differential : mapHistoryItem.differential),
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
        matchHistoryData: '<',
        chartTitle: '@',
      },
      link: link,
      templateUrl: '/ng-partials/breakdown/Chart-MatchHistory/matchHistoryChart.html',
    }
  }]).name
