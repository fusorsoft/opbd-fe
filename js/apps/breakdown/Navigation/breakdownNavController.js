var breakdownControllers = angular.module('breakdownAppControllers');

breakdownControllers.controller('breakdownNavController', [
	'$scope',
	'userData',
	'$location',
	function($scope, userData, $location) {

		var matches = $location.absUrl().match(/\/User\/(\d+)/);

		if (matches) {
			var userId =  matches[1];

			userData.getUserInfo(userId).then(function(response) {
				$scope.userInfo = response.data;
			});
		}
	}
]);