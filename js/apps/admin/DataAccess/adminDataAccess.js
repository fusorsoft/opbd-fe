angular.module('adminDataAccess').factory('Users', ['$http', '$q', function($http, $q) {
	var getUsers = function() {

		var deferred = $q.defer();

		$http.get('/_api/admin/users').then(function(data) {
			deferred.resolve(data);
		},
		function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
}]);