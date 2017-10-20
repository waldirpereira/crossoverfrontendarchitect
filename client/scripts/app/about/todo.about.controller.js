(function () {
    "use strict";

    angular.module("todo")
        .controller("AboutController", ["$location", AboutController]);

    function AboutController($location) {
        var ctrl = this;

        ctrl.openTodo = openTodo;

        function openTodo() {
            $location.path("/todo");
        }
    }
})();
