import apiHelpers from './apiHelpers'
import matchData from './matchData'
import userData from './userData'

import angular from 'angular'

export default angular.module('dataAccess', [])
  .factory('apiHelpers', ['$http', apiHelpers])
  .factory('matchData', ['$http', '$filter', 'Ranks', matchData])
  .factory('userData', ['$http', 'apiHelpers', userData])
  .name
