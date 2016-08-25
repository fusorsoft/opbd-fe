angular.module('adminControllers').controller('userAdminController', [
	'$scope', 
	'Users', 
	'toaster',  
	'ngDialog',
	function($scope, users, toaster, ngDialog) { 
	
	$scope.currentUser = null;
	
	$scope.checks = {
		visitorChecked: false,
		userChecked: false,
		adminChecked: false
	};

	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
		$scope.checks.visitorChecked = user.roles.indexOf('visitor') > -1;
		$scope.checks.userChecked = user.roles.indexOf('user') > -1;
		$scope.checks.adminChecked = user.roles.indexOf('admin') > -1;
		ngDialog.open({
			template: 'userEditorTemplate',
			scope: $scope,
		});
	};

	$scope.updateUser = function() {
		
		if ($scope.currentUser) {
			var newRoles = [];

			if ($scope.checks.visitorChecked) {
				newRoles.push("visitor");
			}

			if ($scope.checks.userChecked) {
				newRoles.push("user");
			}

			if ($scope.checks.adminChecked) {
				newRoles.push("admin");
			}

			users.updateUser($scope.currentUser.steamID, newRoles).then(function() {
				toaster.pop('success', 'Success', 'User updated!');
				$scope.currentUser.roles = newRoles;
				ngDialog.closeAll();
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