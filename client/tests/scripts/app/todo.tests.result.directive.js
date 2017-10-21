(function () {
    "use strict";

    angular.module("todo.test", ["todo"]);

    angular.module("todo.test")
        .directive("todoTestResults", ["$compile", todoTestResults]);

    function todoTestResults($compile) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                var html = '<div></div>';
                var e = $compile(html)(scope);
                element.replaceWith(e);

                $(".jasmine_html-reporter").appendTo(e);
            }
        };
    }
})();
