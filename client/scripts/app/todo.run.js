(function () {
    "use strict";

    var app = angular.module("todo");

    app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
      $rootScope.$on('$routeChangeStart', function (event) {

        //only /todo requires authentication
        if ($location.path() !== '/todo')
          return;

        if (!Auth.isLoggedIn()) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    }]);
})();
