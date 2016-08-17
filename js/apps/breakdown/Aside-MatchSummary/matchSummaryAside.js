var breakdownDirectives = angular.module('breakdownDirectives');

breakdownDirectives.directive('matchSummaryAside', ['Maps', function(Maps) {

	var link = function(scope, elem, attrs) {
        mapInfo = Maps.GetMapData(scope.map);
        scope.mapName = mapInfo ? mapInfo.prettyName : "";
        scope.mapIcon = mapInfo ? mapInfo.medIconUrl : "";

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