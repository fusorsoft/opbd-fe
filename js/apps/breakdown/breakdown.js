import angular from 'angular'
import 'angularjs-toaster'
import 'chart.js'
import 'angular-chart.js'
import 'angular-tooltips'
import 'angular-scroll'
import 'angular-route'
import 'angular-filter'
import 'angular-animate'
import 'angular-sanitize'
import 'ng-dialog'

import csgoData from './CSGOData'
import dataAccess from './DataAccess'
import utils from './Utils'

import matchSummaryAsideModule from './Aside-MatchSummary/matchSummaryAside'
import adrChartModule from './Chart-ADR/adrChart'
import adrOverTimeChartModule from './Chart-ADROverTime/adrOverTimeChart'
import aggregateMapDataChartModule from './Chart-AggregateMapData/aggregateMapDataChart'
import bodyDamageChartModule from './Chart-BodyDamage/bodyDamageChart'
import historyDataChartModule from './Chart-HistoryData/historyDataChart'
import kdaChartModule from './Chart-KDA/kdaChart'
import killCountChartModule from './Chart-KillCounts/killCountChart'
import matchHistoryChartModule from './Chart-MatchHistory/matchHistoryChart'
import roundDamagehartModule from './Chart-RoundDamage/roundDamageChart'
import weaponDamageChartModule from './Chart-WeaponDamage/weaponDamageChart'
import killDeathMapModule from './Graphic-KillDeathMap/killDeathmap'
import mapBreakdownModule from './MapBreakdown/mapBreakdown'
import roundBreakdownModule from './RoundBreakdown/roundBreakdown'
import roundInfoTableModule from './Table-RoundInfo/roundInfoTable'
import weaponInfoTableModule from './Table-WeaponInfo/weaponInfoTable'
import userLinkModule from './UserLink/userLink'

import addDataModule from './AddData/addData'
import friendsModule from './Friends/friends'
import matchDataModule from './MatchData/matchData'
import matchDetailModule from './MatchDetail/matchDetail'
import breakdownNavModule from './Navigation/breakdownNavController'
import overallDataModule from './OverallData/overallData'

import OverallDataTemplate from './OverallData/overallData.html'
import AddDataTemplate from './AddData/addData.html'
import MatchDataTemplate from './MatchData/matchData.html'
import MatchDetailTemplate from './MatchDetail/matchDetail.html'
import FriendsTemplate from './Friends/friends.html'

const directiveModule = angular.module('breakdownDirectives',
  ['chart.js',
    'toaster',
    csgoData,
    dataAccess,
    '720kb.tooltips',
    'duScroll',
    matchSummaryAsideModule,
    adrChartModule,
    adrOverTimeChartModule,
    aggregateMapDataChartModule,
    bodyDamageChartModule,
    historyDataChartModule,
    kdaChartModule,
    killCountChartModule,
    matchHistoryChartModule,
    roundDamagehartModule,
    weaponDamageChartModule,
    killDeathMapModule,
    mapBreakdownModule,
    roundBreakdownModule,
    roundInfoTableModule,
    weaponInfoTableModule,
    userLinkModule,
  ]).name

const controllersModule = angular.module('breakdownAppControllers',
  ['angular.filter',
    'toaster',
    'ngAnimate',
    directiveModule,
    csgoData,
    dataAccess,
    utils,
    'ngSanitize',
    addDataModule,
    friendsModule,
    matchDataModule,
    matchDetailModule,
    breakdownNavModule,
    overallDataModule,
  ]).name

var breakdownApp = angular.module('breakdownApp', ['ngRoute', controllersModule])

breakdownApp.controller('breakdownAppController', [
  '$scope',
  'userData',
  '$location',
  '$timeout',
  '$templateCache',
  '$http',
  function ($scope, userData, $location, $timeout, $templateCache, $http) {
    var matches = $location.absUrl().match(/\/User\/(\d+)/)

    if (matches) {
      var userId = matches[1]

      userData.getUserInfo(userId).then(function (response) {
        $scope.userInfo = response.data
        var overlay = document.getElementById('loadingOverlay')
        overlay.style.display = 'none'
      })
    }
  },
])

breakdownApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/OverallData', {
    template: OverallDataTemplate,
    controller: 'OverallDataController',
  })
    .when('/AddData', {
      template: AddDataTemplate,
      controller: 'AddDataController',
    })
    .when('/Friends', {
      template: FriendsTemplate,
      controller: 'FriendsController',
    })
    .when('/MatchData', {
      template: MatchDataTemplate,
      controller: 'MatchDataController',
    })
    .when('/MatchData/:matchId?', {
      template: MatchDetailTemplate,
      controller: 'MatchDetailController',
    })
    .otherwise({
      redirectTo: '/OverallData',
    })
}])
