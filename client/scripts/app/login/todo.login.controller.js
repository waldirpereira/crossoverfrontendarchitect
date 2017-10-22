(function () {
    "use strict";

    angular.module("todo")
        .controller("LoginController", ["$scope", "$location", "Auth", LoginController]);

    function LoginController($scope, $location, Auth) {
        var ctrl = this;

        ctrl.submitted = false;
        ctrl.error = false;
        ctrl.credentials = {};

        ctrl.submit = submit;
        ctrl.login = login;

        function submit() {
          ctrl.error = false;
          ctrl.submitted = true;
      		if (!$scope.loginForm.$invalid) {
      			ctrl.login();
      		} else {
      			ctrl.error = true;
      			return;
      		}
        }

        function login() {
          ctrl.error = false;

          Auth.login(ctrl.credentials)
            .then(function(data) {
              if (!data.status || data.status !== 'success') {
          			ctrl.error = true;
                return;
              }

              var user = {
                username: data.username,
                sessionId: data.sessionId
              };
              Auth.setUser(user);
              $location.path("/todo");
            })
            .catch(function(data){
              ctrl.error = true;
            });
        }
    }
})();
