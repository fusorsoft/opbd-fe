export default angular.module('weaponDamageChartModule', [])
  .directive('weaponDamageChart', function () {
    var link = function (scope, elem, attrs) {
      scope.labels = scope.weaponDamageData.map(function (w) {
        return w.weapon
      })

      scope.data = scope.weaponDamageData.map(function (w) {
        return w.damage
      })

      scope.options = {
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
        weaponDamageData: '=',
        chartTitle: '@',
      },
      link: link,
      templateUrl: '/ng-partials/breakdown/Chart-WeaponDamage/weaponDamageChart.html',
    }
  }).name
