NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]

function CA2Config($routeProvider) {
    $routeProvider.when('/register', {templateUrl: 'partials/register'})
                  .when('/login', {templateUrl: 'partials/login'})
                  .when('/', {templateUrl: 'partials/home'})
                  .when('/canvas', {templateUrl: 'partials/canvas', access : {userRequired : true}})
}

function CA2Run ($rootScope, $location, UserService) {
  // Whenever a user manually enters a route (eg via address bar)
  // It checks if they already have a token and validates it.
  // Success: user goes to desired route.
  // Failure: user is sent to homepage.
  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (next.access) {
      if (next.access.userRequired) {
        if (!UserService.exists()) {
          $location.path('/login')
        }
      }
    }
  })
}

angular.module('CA2', ['ngRoute'])
       .config(CA2Config)
       .run(CA2Run)