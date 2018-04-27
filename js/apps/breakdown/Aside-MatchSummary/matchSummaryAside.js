import angular from 'angular'
import matchSummaryAsideTemplate from './matchSummaryAside.html'

const CONTROLLER_NAME = 'MatchSummaryAsideController'

class MatchSummaryAsideController {
  constructor (Maps) {
    this._Maps = Maps
  }
  $onInit () {
    this.mapInfo = this._Maps.getMapData(this.map)
    this.mapName = this.mapInfo ? this.mapInfo.prettyName : ''
    this.mapIcon = this.mapInfo ? this.mapInfo.medIconUrl : ''
  }
}

export default angular.module('matchSummaryAsideModule', [])
  .controller(CONTROLLER_NAME, ['Maps', MatchSummaryAsideController])
  .directive(
    'matchSummaryAside', ['$http', 'Maps', '$window', function ($http, Maps, $window) {
      return {
        restrict: 'E',
        replace: 'true',
        bindToController: {
          map: '@',
          roundWins: '@',
          roundLosses: '@',
          matchDate: '@',
          adr: '@',
          matchId: '@',
          result: '@',
        },
        controller: CONTROLLER_NAME,
        controllerAs: 'msavm',
        template: matchSummaryAsideTemplate,
      }
    }]).name
