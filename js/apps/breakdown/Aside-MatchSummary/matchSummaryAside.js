var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('matchSummaryAside', ['$http', 'Maps', '$window', function($http, Maps, $window) {

	var link = function(scope, elem, attrs) {
        scope.mapInfo = Maps.GetMapData(scope.map);
        scope.mapName = scope.mapInfo ? scope.mapInfo.prettyName : "";
        scope.mapIcon = scope.mapInfo ? scope.mapInfo.medIconUrl : "";

        scope.goToMatch = function() {         
            window.location.href ="#/MatchData/" + scope.matchId;
        };
    };

	return {
		restrict: 'E',
		replace: 'true',
		scope: {
			map: '@',
            roundWins: "@",
            roundLosses: "@",
            matchDate: "@",
            adr: "@",
            matchId: "@",
            result: "@"
		},
		link: link,
		templateUrl: '/ng-partials/breakdown/Aside-MatchSummary/matchSummaryAside.html'
	};
}]);