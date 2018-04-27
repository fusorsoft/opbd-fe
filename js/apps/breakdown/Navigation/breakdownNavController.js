import angular from 'angular'
import breakdownNavTemplate from './breakdownNav.html'

export default angular.module('breakdownNavModule', [])
  .directive('breakdownNav', function () {
    return {
      restrict: 'E',
      replace: true,
      template: breakdownNavTemplate,
    }
  }).name
