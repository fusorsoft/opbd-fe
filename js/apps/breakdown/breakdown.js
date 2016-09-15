angular.module('csgoData', []);
angular.module('dataAccess', []);
angular.module('utils', []);

var breakdownDirectives = angular.module('breakdownDirectives',
	['chart.js', 
	'toaster', 
	'csgoData', 
	'dataAccess',
	'720kb.tooltips',
	]);

var breakdownControllers = angular.module('breakdownAppControllers', 
	['angular.filter', 
	'toaster', 
	'ngAnimate', 
	'breakdownDirectives', 
	'csgoData',
	'dataAccess',
	'utils'
	]);

var breakdownApp = angular.module('breakdownApp', ['ngRoute', 'breakdownAppControllers']);

breakdownApp.controller('breakdownAppController', [
	'$scope',
	'userData',
	'$location',
	'$timeout',
	'$templateCache', 
	'$http',
	function($scope, userData, $location, $timeout, $templateCache, $http) {

		var matches = $location.absUrl().match(/\/User\/(\d+)/);

		if (matches) {
			var userId =  matches[1];

			userData.getUserInfo(userId).then(function(response) {
				$scope.userInfo = response.data;
			});
		}

		$timeout(function() {
			var overlay = document.getElementById('loadingOverlay');
			overlay.style.display = "none";

			var basePath = '/ng-partials/breakdown';

			$http.get(basePath + '/MatchData/matchData.html', { cache: $templateCache });
			$http.get(basePath + '/MatchDetail/matchDetail.html', { cache: $templateCache });
			$http.get(basePath + '/Friends/friends.html', { cache: $templateCache });
		}, 0);
	}
]);

breakdownApp.config(['$routeProvider', function($routeProvider) {

	var basePath = '/ng-partials/breakdown';

	$routeProvider.when('/OverallData', {
		templateUrl: basePath + '/OverallData/overallData.html',
		controller: 'OverallDataController'
	}).
	when('/AddData', {
		templateUrl: basePath + '/AddData/addData.html',
		controller: 'AddDataController'
	}).
	when('/MatchData', {
		templateUrl: basePath + '/MatchData/matchData.html',
		controller: 'MatchDataController'
	}).
	when('/MatchData/:matchId?', {
		templateUrl: basePath + '/MatchDetail/matchDetail.html',
		controller: 'MatchDetailController'
	}).
	when('/Friends', {
		templateUrl: basePath + '/Friends/friends.html',
		controller: 'FriendsController'
	}).
	otherwise({
		redirectTo: '/OverallData'
	});
}]);