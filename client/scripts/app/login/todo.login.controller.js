(function () {
    "use strict";

    angular.module("todo")
        .controller("LoginController", ["$scope", "$location", "Auth", LoginController]);

    function LoginController($scope, $location, Auth) {
        var ctrl = this;

        ctrl.submitted = false;
        ctrl.credentials = {};

        ctrl.submit = submit;
        ctrl.login = login;

        function submit() {
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

          var authResponse = Auth.login(ctrl.credentials);

          if (!authResponse.status || authResponse.status !== 'success') {
      			ctrl.error = true;
            return;
          }

          var user = { username: authResponse.username, sessionId: authResponse.sessionId };
          Auth.setUser(user);

          $location.path("/todo");
        }
    }
})();
