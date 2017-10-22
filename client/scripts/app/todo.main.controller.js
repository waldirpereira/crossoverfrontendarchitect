(function () {
    "use strict";

    angular.module("todo")
        .controller("MainController", ["$location", "Auth", MainController]);

    function MainController($location, Auth) {
        var ctrl = this;

        ctrl.isLoggedIn = isLoggedIn;
        ctrl.logout = logout;
        ctrl.getUsername = getUsername;
        ctrl.isActive = isActive;

        function isLoggedIn(){
          return Auth.isLoggedIn();
        }
        function getUsername(){
          return Auth.getUsername();
        }

        function logout() {
          Auth.logout()
            .then(function(data){
              if (!data.status || data.status !== 'success')
                return;

              Auth.setUser(null);
              $location.path("/");
            })
            .catch(function(){
              console.log('Logout error!');
            });
        }

        function isActive(viewLocation) {
          return viewLocation === $location.path();
        }
    }
})();
