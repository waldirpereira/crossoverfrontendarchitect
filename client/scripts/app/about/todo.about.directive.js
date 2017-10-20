(function () {
    "use strict";

    angular.module("todo")
        .directive("todoAbout", ["$compile", "ROUTES", "TemplateService", todoAbout]);

    function todoAbout($compile, ROUTES, TemplateService) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                TemplateService.getTemplate(ROUTES.readmeFile).then(function (response) {
                    var readme = response.data;
                    var pre = $("<PRE/>").html(readme);
                    element.html(pre);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();
