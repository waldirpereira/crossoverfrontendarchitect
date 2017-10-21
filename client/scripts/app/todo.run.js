(function () {
    "use strict";

    var app = angular.module("todo");

    app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
      $rootScope.$on('$routeChangeStart', function (event) {
        if ($location.path() === '/login' || $location.path() === '/tests')
          return;

        if (!Auth.isLoggedIn()) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    }]);
})();
