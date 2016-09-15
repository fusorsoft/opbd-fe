var feedbackApp = angular.module('feedbackApp', ['toaster']);

feedbackController = feedbackApp.controller('feedbackController', [
	'$http',
	'$location', 
	'$scope', 
	'toaster',
	function($http, $location, $scope, toaster) {
		$scope.url = $location.absUrl();
		$scope.message = '';
		$scope.subject = '';

		$scope.submitFeedback = function() {

			request = {
				method: 'POST',
				url: '/_api/breakdown/feedback',
				headers: {
					'Content-Type': 'application/json'
				},
				data: angular.toJson({
					url : $scope.url,
					message: $scope.message,
					subject: $scope.subject
				})
			};

			$http(request).then(function() {
					toaster.pop('success', 'Success', "Your feedback was sent");
				},
				function(err) {
					toaster.pop('error', 'Error', "Error submitting feedback");
				}
			);
		};
	}
]);