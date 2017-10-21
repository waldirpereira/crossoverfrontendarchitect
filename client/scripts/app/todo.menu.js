(function () {
    "use strict";

    angular.module("todo")
        .directive("todoMenu", ["$compile", "ROUTES", "TemplateService", todoMenu]);

    function todoMenu($compile, ROUTES, TemplateService) {
        return {
            restrict: 'E',
            link: function (scope, element) {

                TemplateService.getTemplate(ROUTES.menuTemplate).then(function (response) {
                    var menu = response.data;
                    element.html(menu);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();
