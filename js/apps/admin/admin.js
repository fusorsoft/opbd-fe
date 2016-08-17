angular.module('adminDataAccess', []);

var adminControllers = angular.module('adminControllers', ['adminDataAccess']);
var adminApp = angular.module('adminApp', ['ngRoute', 'adminControllers']);

adminApp.config(['$routeProvider', function($routeProvider) {

	var basePath = '/ng-partials/admin';

	$routeProvider.when('/Users', {
		templateUrl: basePath + '/Users/adminUsers.html',
		controller: 'userAdminController'
	}).
	otherwise({
		redirectTo: '/Users'
	});
}]);