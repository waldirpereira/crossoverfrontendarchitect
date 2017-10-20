(function () {
    "use strict";

    angular.module("todo")
        .controller("MainController", ["$location", "Auth", MainController]);

    function MainController($location, Auth) {
        var ctrl = this;

        ctrl.isLoggedIn = isLoggedIn;
        ctrl.logoff = logoff;
        ctrl.getUsername = getUsername;

        function isLoggedIn(){
          return Auth.isLoggedIn();
        }
        function getUsername(){
          return Auth.getUsername();
        }

        function logoff() {
          var authResponse = Auth.logoff();

          if (!authResponse)
            return;

          Auth.setUser(null);
          $location.path("/");
        }
    }
})();
