(function () {
    "use strict";

    angular.module("todo")
        .controller("TodoController", ["$location", TodoController]);

    function TodoController($location) {
        var ctrl = this;
    }
})();
