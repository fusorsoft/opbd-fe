export default angular.module('addDataModule', [])
  .controller('AddDataController', [
    '$scope',
    '$filter',
    'toaster',
    'matchData',
    function ($scope, $filter, toaster, matchData) {
      $scope.file = '[No File]'
      $scope.fileData = ''
      $scope.data = {}
      $scope.selectAll = false
      $scope.errorMessage = null
      $scope.submitEnabled = false

      $scope.playerDisplayData = null

      var fileLoadedHandler = function (event) {
        var reader = event.target
        $scope.fileData = reader.result
        $scope.data = angular.fromJson(reader.result)

        // two-way binding on large objects is really slow... we'll project
        // the raw data on to simpler objects and re-map to the actual data
        // later, when it's reasonable for the user to wait.
        $scope.playerDisplayData = $scope.data.Players.map(function (player) {
          return {
            Name: player.Name,
            MatchTeam: player.MatchTeam,
            SteamID: player.SteamID,
            checked: false,
            disabled: false,
          }
        })

        $scope.$apply()
      }

      $scope.playerToggled = function () {
        $scope.submitEnabled = $scope.playerDisplayData.some(function (ele) {
          return ele.checked
        })
      }

      $scope.submitData = function () {
        $scope.playerDisplayData.forEach(function (p) {
          p.disabled = true
        })

        var selectedPlayerIds = $scope.playerDisplayData.filter(function (p) {
          return p.checked === true
        })

        var playerDataToSubmit = []

        selectedPlayerIds.map(function (p) {
          var associatedData = $scope.data.Players.filter(function (pd) {
            return p.SteamID === pd.SteamID
          })

          // 2 players shouldn't be able to share a SteamID
          playerDataToSubmit.push(associatedData[0])
        })

        var postData = {
          matchMetadata: $scope.data.MatchMetadata,
          demoFileMetadata: $scope.data.DemoFileMetadata,
          playerData: playerDataToSubmit,
        }

        matchData.addMatchData(postData).then(function (resp) {
          toaster.pop('success', 'Success', resp.data.message)
        }, function (err) {
          $scope.errorMessage = err.status + ' ' + err.statusText
          toaster.pop('error', 'Error', $scope.errorMessage)
        })
      }

      $scope.selectAllToggled = function () {
        if ($scope.playerDisplayData === null) { return }

        if ($scope.selectAll === false) {
          $scope.playerDisplayData.forEach(function (p) {
            p.checked = false
          })
        } else {
          $scope.playerDisplayData.forEach(function (p) {
            p.checked = true
            $scope.playerToggled()
          })
        }
      }

      $scope.fileNameChanged = function (ele) {
        // no native databinding for file input in angular...
        $scope.file = ele.files[0].name

        var reader = new FileReader()

        reader.onload = fileLoadedHandler

        reader.readAsText(ele.files[0])
      }
    }]
  ).name
