angular.module('adminControllers').controller('userAdminController', ['$scope', 'Users', function($scope, users){ 
	users.getUsers().then(function(data) {
		$scope.data = data.data;
	});
}]);