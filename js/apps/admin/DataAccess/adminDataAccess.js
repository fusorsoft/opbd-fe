export default angular.module('adminDataAccess', [])
  .factory('Users', ['$http', function ($http) {
    var getUsers = function () {
      return $http.get('/_api/admin/users')
    }

    var updateUser = function (steamId, roles) {
      const request = {
        method: 'POST',
        url: '/_api/users/' + steamId + '/roles',
        headers: {
          'Content-Type': 'application/json',
        },
        data: angular.toJson({
          'roles': roles,
        }),
      }

      return $http(request)
    }

    return {
      getUsers: getUsers,
      updateUser: updateUser,
    }
  }]).name
