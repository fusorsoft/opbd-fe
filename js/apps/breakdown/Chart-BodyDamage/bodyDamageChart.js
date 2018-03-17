var breakdownDirectives = angular.module('breakdownDirectives')

breakdownDirectives.directive('bodyDamageChart', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      w: '=weaponDamageData',
      bodyImageUrl: '@bodyImageUrl',
    },
    templateUrl: '/ng-partials/breakdown/Chart-BodyDamage/bodyDamageChart.html',
  }
})
