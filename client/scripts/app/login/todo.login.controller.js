(function () {
    "use strict";

    angular.module("todo")
        .controller("LoginController", ["$location", LoginController]);

    function LoginController($location) {
        var ctrl = this;

        ctrl.openTodo = openTodo;

        function openTodo() {
            $location.path("/todo");
        }
    }
})();
