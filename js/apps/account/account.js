var accountApp = angular.module('accountApp', [])

accountApp.controller('accountController', function ($scope) {
  $scope.minPasswordLength = 8
  $scope.password = ''
  $scope.confirmPassword = ''
  $scope.email = ''

  var passwordValid = function () {
    var passwordAndConfirmSame = $scope.password === $scope.confirmPassword
    var passwordLongEnough = $scope.password.length >= $scope.minPasswordLength

    return (passwordAndConfirmSame && passwordLongEnough) ||
           $scope.password.length === 0
  }

  var emailValid = function () {
    var hasAtAndDot = $scope.email.indexOf('.') > -1 && $scope.email.indexOf('@') > -1
    var hasDotAfterAt = $scope.email.lastIndexOf('.') > $scope.email.indexOf('@')
    var hasOneAt = $scope.email.indexOf('@') === $scope.email.lastIndexOf('@')
    var hasCharacterAfterDot = $scope.email.lastIndexOf('.') < ($scope.email.length - 1)

    return (hasAtAndDot && hasDotAfterAt && hasOneAt && hasCharacterAfterDot) ||
           $scope.email.length === 0
  }

  $scope.emailValidationClass = function () {
    var goodToGo = emailValid()
    return goodToGo ? '' : 'ob-invalid-input'
  }

  $scope.passwordValidationClass = function () {
    var goodToGo = passwordValid()
    return goodToGo ? '' : 'ob-invalid-input'
  }

  $scope.formIsValid = function () {
    var passwordGood = passwordValid() && $scope.password.length > 0
    var emailGood = emailValid() && $scope.email.length > 0

    return !(passwordGood && emailGood)
  }
})
