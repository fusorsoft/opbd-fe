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

console.log('s', searchControllersModule)

const widgetsModule = angular.module('opBreakdownWidgets', [
  typeaheadWidgetModule,
]).name

angular.module('breakdownBetaEmailApp', [
  'toaster',
  emailAppControllerModule,
]).name

angular.module('searchApp', [
  searchControllersModule,
  widgetsModule,
  '720kb.tooltips',
]).name

angular.module('topUsersApp', [
  'toaster',
  topUsersControllerModule,
]).name

angular.module('feedbackApp', [
  'toaster',
  feedbackControllerModule,
<<<<<<< Updated upstream
])
=======
]).name

export default angular.module('global', [
  breakdownBetaEmailAppModule,
  searchAppModule,
  topUsersAppModule,
  feedbackAppModule,
]).name
>>>>>>> Stashed changes
