export default function ($http) {
  var simpleGetQuery = function (url) {
    return $http.get(url)
  }

  var simpleDeleteQuery = function (url) {
    $http.delete(url)
  }

  return {
    simpleGetQuery: simpleGetQuery,
    simpleDeleteQuery: simpleDeleteQuery,
  }
}
