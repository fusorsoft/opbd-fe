export default angular.module('feedbackControllerModule', [])
  .controller('feedbackController', [
    '$http',
    '$location',
    '$scope',
    '$q',
    'toaster',
    function ($http, $location, $scope, $q, toaster) {
      $scope.url = $location.absUrl()
      $scope.message = ''
      $scope.subject = ''

      $scope.submitFeedback = function () {
        const request = {
          method: 'POST',
          url: '/_api/breakdown/feedback',
          headers: {
            'Content-Type': 'application/json',
          },
          data: angular.toJson({
            url: $scope.url,
            message: $scope.message,
            subject: $scope.subject,
          }),
        }

        $http.get('/_api/users').then(function (info) {
          const contactRequest = {
            method: 'PUT',
            url: 'https://contact.fusorsoft.net',
            headers: {
              'Content-Type': 'application/json',
            },
            data: angular.toJson({
              user: info.username + '(' + info.steamID + ')',
              url: $scope.url,
              message: $scope.message,
              subject: $scope.subject,
            }),
          }

          $q.all([
            $http(request),
            $http(contactRequest),
          ]).then(function () {
            toaster.pop('success', 'Success', 'Your feedback was sent')
          },
          function () {
            toaster.pop('error', 'Error', 'Error submitting feedback')
          }
          )
        })
      }
    },
  ]).name
