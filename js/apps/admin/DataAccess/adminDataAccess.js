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

	var updateUser = function(steamId, roles) {
		var deferred = $q.defer();

		request = {
			method: 'POST',
			url: '/_api/users/' + steamId + '/roles',
			headers: {
				'Content-Type': 'application/json'
			},
			data: angular.toJson({
				'roles': roles
			})
		};


		$http(request).then(function(resp) {
				deferred.resolve(resp);
				
			},
			function(err) {
				deferred.reject(err);
			}
		);

		return deferred.promise;
	};

	return {
		getUsers: getUsers,
		updateUser: updateUser
	};
}]);