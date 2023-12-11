import angular from 'angular'
import globalModule from './global/global'
import accountModule from './account/account'
import breakdownModule from './breakdown/breakdown'

export default angular.module('opbd', [
  globalModule,
  accountModule,
  breakdownModule,
]).name
