var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('userLink', ['toaster', 'userData', function(toaster, userData) {

	var link = function(scope, elem, attrs) {

		if (scope.matchId) {
			scope.userLink = "/User/" + scope.steamId + '#/MatchData/' + scope.matchId;
		} else {
			scope.userLink = "/User/" + scope.steamId;
		}

		scope.addFriend = function() {
			
			userData.addFriend(scope.steamId, scope.name)
				.then(function() {
						toaster.pop('success', 'Success', "Added " + scope.name + " to your friends list");
					},
					function(err) {
						toaster.pop('error', 'Error', "Unable to add to friends list");
					}
				);
		};
	};

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
			name: "@",
			steamId: "@",
			matchId: "@"
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/UserLink/userLink.html'
	};
}]);