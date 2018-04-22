import angular from 'angular'

export default angular.module('emailAppControllerModule', [])
  .controller('emailAppController', ['$http', '$scope', '$interval', 'toaster', function ($http, $scope, $interval, toaster) {
    $scope.email = ''
    $scope.emailSent = false
    $scope.retries = 5

    var emailsTried = []

    var timerPromise = null

    var countDown = function () {
      --$scope.retryTimer

      if ($scope.retryTimer === -1) {
        $scope.emailSent = false
        $interval.cancel(timerPromise)
      }
    }

    $scope.emailChanged = function () {
      if (timerPromise) {
        $interval.cancel(timerPromise)
      }

      $scope.emailSent = false
    }

    $scope.submitEmailAddress = function () {
      if (emailsTried.indexOf($scope.email) > -1) {
        // crafty bastard is tried changing it, then changing it back...
        // if you're clever enough to try to get around this, know that the
        // server is just going to reject it anyway....
        $scope.emailSent = true
        $scope.retryTimer = 180
        timerPromise = $interval(countDown, 1000)
        toaster.pop('error', 'Error', 'You\'ve already tried this email address')
        return
      }

      if ($scope.retries === 0) {
        toaster.pop('error', 'Error', 'Too many attempts today.  Take some time to figure out your email address.')
      }

      emailsTried.push($scope.email)
      $scope.retries--

      $http.get('/_api/users').then(function (user) {
        const request = {
          method: 'POST',
          url: '/_api/users/' + user.data.steamID + '/email',
          headers: {
            'Content-Type': 'application/json',
          },
          data: angular.toJson({
            email: $scope.email,
          }),
        }

        $http(request).then(function () {
          toaster.pop('success', 'Success', 'Confirmation email has been sent to ' + $scope.email)
        }, function () {
          toaster.pop('error', 'Error', 'Error during submit')
        })
      }, function () {
        toaster.pop('error', 'Error', 'Error during submit')
      })

      if ($scope.email) {
        $scope.emailSent = true
        $scope.retryTimer = 180

        timerPromise = $interval(countDown, 1000)
      } else {
        toaster.pop('error', 'Error', 'Invalid Email')
      }
    }
  }]).name
