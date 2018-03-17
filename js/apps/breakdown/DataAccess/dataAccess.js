angular.module('dataAccess').factory('apiHelpers', ['$http', '$q', function ($http, $q) {
  var simpleGetQuery = function (url) {
    var deferred = $q.defer()

    $http.get(url).then(function (resp) {
      deferred.resolve(resp)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  var simpleDeleteQuery = function (url) {
    var deferred = $q.defer()

    $http.delete(url).then(function (resp) {
      deferred.resolve(resp)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  return {
    simpleGetQuery: simpleGetQuery,
    simpleDeleteQuery: simpleDeleteQuery,
  }
}])
