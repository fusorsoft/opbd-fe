import 'angular-route'
import 'angularjs-toaster'
import 'ng-dialog'

import {
  userAdminController,
  default as userAdminControllerModule,
} from './users/adminUsers'

const adminApp = angular.module('adminApp', ['ngRoute', userAdminControllerModule])

adminApp.config(['$routeProvider', function ($routeProvider) {
  const basePath = '/ng-partials/admin'

  $routeProvider.when('/Users', {
    templateUrl: basePath + '/Users/adminUsers.html',
    controller: userAdminController,
  })
    .otherwise({
      redirectTo: '/Users',
    })
}])
