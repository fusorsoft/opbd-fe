import angular from 'angular'
import './utils'
import 'angularjs-toaster'
import './navigation/userActionsMenu'
import 'angular-tooltips'

import searchControllersModule from './search'
import typeaheadWidgetModule from './Widget-Typeahead/typeaheadWidget'
import emailAppControllerModule from './betaEmail'
import topUsersControllerModule from './TopUsers/topUsers'
import feedbackControllerModule from './Feedback/feedback'

const widgetsModule = angular.module('opBreakdownWidgets', [
  typeaheadWidgetModule,
]).name

const breakdownBetaEmailAppModule = angular.module('breakdownBetaEmailApp', [
  'toaster',
  emailAppControllerModule,
]).name

const searchAppModule = angular.module('searchApp', [
  searchControllersModule,
  widgetsModule,
  '720kb.tooltips',
]).name

const topUsersAppModule = angular.module('topUsersApp', [
  'toaster',
  topUsersControllerModule,
]).name

const feedbackAppModule = angular.module('feedbackApp', [
  'toaster',
  feedbackControllerModule,
]).name

export default angular.module('global', [
  breakdownBetaEmailAppModule,
  searchAppModule,
  topUsersAppModule,
  feedbackAppModule,
]).name
