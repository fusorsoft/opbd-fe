import angular from 'angular'
import roundInfoTableTemplate from './roundInfoTable.html'
import roundSummaryRowTemplate from './roundSummaryRow.html'
import roundDetailRowTemplate from './roundDetailRow.html'

export default angular.module('roundInfoTableModule', [])
  .directive('roundInfoTable', function () {
    var link = function (scope, elem, attrs) {
      scope.visibilities = {}

      scope.toggleVisiblity = function (key) {
        scope.visibilities[key] = !scope.visibilities[key]
      }
    }

    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        roundData: '=',
        map: '@',
      },
      link: link,
      template: roundInfoTableTemplate,
    }
  })
  .directive('roundSummaryRow', function () {
    var link = function (scope, elem, attrs) {
      scope.parseInt = window.parseInt
    }

    return {
      restrict: 'A',
      replace: 'true',
      scope: {
        roundData: '=',
        visible: '@',
        round: '@',
      },
      link: link,
      template: roundSummaryRowTemplate,
    }
  })
  .directive('roundDetailRow', ['Weapons', function (Weapons) {
    var link = function (scope, elem, attrs) {
      scope.weaponDamageData = scope.roundData.WeaponData.map(function (p) {
        return {
          weapon: Weapons.getInfo(p.Weapon).Name,
          damage: p.TotalDamage,
          accuracy: p.Accuracy * 100,
          shotsHit: p.ShotsHit,
          shotsFired: p.ShotsFired,
        }
      })

      scope.teamIcon = scope.roundData.Team === 'CT' ? '/images/ctlogo64.png' : '/images/tlogo64.png'

      function oppositeTeam (team) {
        return team === 'CT' ? 'T' : 'CT'
      }

      function extractData (d, isKiller, playerTeam) {
        var weapon = ''
        var weaponIcon = ''

        try {
          if (d.Weapon !== 'Unknown') {
            weapon = d.Weapon
          } else {
            // ??
            if (d.Position.Weapon === 'Incendiary') {
              // this needs to be investigated more thoroughly, but this appears
              // to be what it looks like when you kill someone with fire...
              weapon = 'Fire'
            }
          }

          weaponIcon = Weapons.getInfo(weapon).IconUrl
        } catch (e) {
          console.error('No data for ' + d.Weapon)
        }

        return {
          killer: d.KillerName,
          victim: d.VictimPosition.Name,
          weapon: weapon,
          weaponIcon: weaponIcon,
          headshot: d.Headshot,
          timeInRound: d.TimeInToRound,
          data: d,
          isKiller: isKiller,
          isVictim: !isKiller,
          killerTeam: isKiller ? playerTeam : oppositeTeam(playerTeam),
          victimTeam: !isKiller ? playerTeam : oppositeTeam(playerTeam),
          selected: false,
        }
      }

      scope.killFeed = []

      if (scope.roundData.KillData && scope.roundData.KillData.length > 0) {
        for (var i = 0; i < scope.roundData.KillData.length; i++) {
          scope.killFeed.push(
            extractData(scope.roundData.KillData[i], true, scope.roundData.Team)
          )
        }
      }

      if (scope.roundData.DeathInfo) {
        scope.killFeed.push(
          extractData(scope.roundData.DeathInfo, false, scope.roundData.Team)
        )
      }

      scope.selectedKill = null

      scope.killSelected = function (kill) {
        scope.killFeed.map(function (k) {
          k.selected = false
        })

        kill.selected = true
        scope.selectedKill = kill.data
      }
    }

    return {
      restrict: 'A',
      replace: 'true',
      scope: {
        roundData: '=',
        map: '@',
      },
      link: link,
      template: roundDetailRowTemplate,
    }
  }]).name
