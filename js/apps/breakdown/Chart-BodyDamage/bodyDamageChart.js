export default angular.module('bodyDamageChartModule', [])
  .directive('bodyDamageChart', function () {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        w: '=weaponDamageData',
        bodyImageUrl: '@bodyImageUrl',
      },
      templateUrl: '/ng-partials/breakdown/Chart-BodyDamage/bodyDamageChart.html',
    }
  }).name
