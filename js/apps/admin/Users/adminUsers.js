angular.module('adminControllers').controller('userAdminController', ['$scope', 'Users', 'toaster',  function($scope, users, toaster){ 
	
	$scope.currentUser = null;
	// $scope.visitorChecked = false;
	// $scope.userChecked = false;
	// $scope.adminChecked = false;

	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
	};

	$scope.updateUser = function() {
		
		if ($scope.currentUser) {
			var newRoles = [];

			if ($scope.visitorChecked) {
				newRoles.push("visitor");
			}

			if ($scope.userChecked) {
				newRoles.push("user");
			}

			if ($scope.adminChecked) {
				newRoles.push("admin");
			}

			users.updateUser($scope.currentUser.steamID, newRoles).then(function() {
				toaster.pop('success', 'Success', 'User updated!');
			}, function(err) {
				toaster.pop('error', 'Error', 'Error updating user');
			});

		} else {
			toaster.pop('error', 'Error', "No user selected");
		}
	};

	users.getUsers().then(function(data) {
		$scope.data = data.data;
	});


}]);