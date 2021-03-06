import angular from 'angular'
import historyDataChartTemplate from './historyDataChart.html'

export default angular.module('historyDataChartModule', [])
  .directive('historyDataChart', ['$filter', '$window', '$timeout', function ($filter, $window, $timeout) {
    var link = function (scope, element, attrs) {
      scope.selectedData = 'DifferentialOverTime'
      scope.data = []
      scope.labels = []
      scope.series = ''

      class FilterNode {
        constructor (name, days, selected) {
          this.name = name
          this.days = days
          this.selected = selected
        }
      }

      scope.filters = [
        new FilterNode('All Time', 0, true),
        new FilterNode('180 Days', 180, true),
        new FilterNode('60 Days', 60, true),
        new FilterNode('30 Days', 30, false),
        new FilterNode('7 Days', 7, false),
      ]

      var beautifyLabels = function (labels) {
        return labels.map(function (l) { return $filter('date')(l, 'M-dd-yy') })
      }

      var updateFn = function () {
        if (scope.historyData) {
          var currentFilter = scope.filters.filter(function (f) {
            return f.selected
          })

          scope.applyFilter(currentFilter[0])
        }
      }

      scope.$watch('historyData', updateFn)
      scope.$watch('selectedData', updateFn)

      var sliceSize = 0

      scope.applyFilter = function (clickedFilter) {
        scope.filters.map(function (f) { f.selected = false })
        clickedFilter.selected = true

        if (clickedFilter.days === 0) {
          scope.data = scope.historyData[scope.selectedData].data
          scope.labels =
            beautifyLabels(scope.historyData[scope.selectedData].labels)
          scope.series = scope.historyData[scope.selectedData].series
          sliceSize = 0
        } else {
          var today = new Date()
          var filterDate = new Date()
          filterDate.setDate(today.getDate() - clickedFilter.days)

          sliceSize =
            scope.historyData[scope.selectedData].labels.filter(function (d) {
              var thisDate = new Date(d)
              return thisDate >= filterDate
            }).length

          if (sliceSize !== 0) {
            scope.data =
              scope.historyData[scope.selectedData].data.slice(sliceSize * -1)
            scope.labels =
              beautifyLabels(scope.historyData[scope.selectedData]
                .labels
                .slice(sliceSize * -1))
          } else {
            scope.data = []
            scope.labels = []
          }
        }
      }

      scope.onClick = function (points, evt) {
        if (points.length > 0) {
          var firstPoint = points[0]
          var dataIndex = firstPoint._index
          var datum = scope.historyData[scope.selectedData].matchIds[dataIndex]

          $window.location.href = '#/MatchData/' + datum
        }
      }

      scope.historyChartOptions = {
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 20,
            },
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
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
              var i = items[0].index
              var points = scope.historyData[scope.selectedData].data
              var offsetIndex =
                sliceSize !== 0 ? points.length - sliceSize + i : i
              return scope.historyData[scope.selectedData].titleFn(offsetIndex)
            },
            label: function (item, data) {
              var i = item.index
              var points = scope.historyData[scope.selectedData].data
              var offsetIndex =
                sliceSize !== 0 ? points.length - sliceSize + i : i
              return scope.historyData[scope.selectedData].labelFn(offsetIndex)
            },
          },
        },
      }
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        historyData: '<',
      },
      link: link,
      template: historyDataChartTemplate,
    }
  }]).name
