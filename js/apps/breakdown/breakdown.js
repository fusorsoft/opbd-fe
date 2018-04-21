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
import utils from './utils'

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
      })
    }

    $timeout(function () {
      var overlay = document.getElementById('loadingOverlay')
      overlay.style.display = 'none'

      var basePath = '/ng-partials/breakdown'

      $http.get(basePath + '/MatchData/matchData.html', { cache: $templateCache })
      $http.get(basePath + '/MatchDetail/matchDetail.html', { cache: $templateCache })
      $http.get(basePath + '/Friends/friends.html', { cache: $templateCache })
    }, 0)
  },
])

breakdownApp.config(['$routeProvider', function ($routeProvider) {
  var basePath = '/ng-partials/breakdown'

  $routeProvider.when('/OverallData', {
    templateUrl: basePath + '/OverallData/overallData.html',
    controller: 'OverallDataController',
  })
    .when('/AddData', {
      templateUrl: basePath + '/AddData/addData.html',
      controller: 'AddDataController',
    })
    .when('/MatchData', {
      templateUrl: basePath + '/MatchData/matchData.html',
      controller: 'MatchDataController',
    })
    .when('/MatchData/:matchId?', {
      templateUrl: basePath + '/MatchDetail/matchDetail.html',
      controller: 'MatchDetailController',
    })
    .when('/Friends', {
      templateUrl: basePath + '/Friends/friends.html',
      controller: 'FriendsController',
    })
    .otherwise({
      redirectTo: '/OverallData',
    })
}])
