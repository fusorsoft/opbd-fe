import angular from 'angular'
import weaponInfoTableTemplate from './weaponInfoTable.html'

export default angular.module('weaponInfoTableModule', [])
  .directive('weaponInfoTable', function () {
    var controller = ['$scope', '$filter', function ($scope, $filter) {
      $scope.orderByField = 'TotalDamage'
      $scope.reverse = true

      $scope.toggleRow = function (w) {
        w.expanded = !w.expanded
      }

      $scope.headingClicked = function (field) {
        var currentSortField = $scope.orderByField

        if (field === currentSortField) {
          // just changing direction
          $scope.reverse = !$scope.reverse
        } else {
          // clicked a different field.... sort desc
          $scope.reverse = true
          $scope.orderByField = field
        }
      }
    }]

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        weaponInfoData: '=weaponInfoData',
      },
      controller: controller,
      template: weaponInfoTableTemplate,
    }
  }).name
