(function () {
    "use strict";

    angular.module("todo")
        .factory('TemplateService', ["$http", function($http) {
            var getTemplate = function(templateFullPath) {
                return $http.get(templateFullPath);
            };
            return {
                getTemplate: getTemplate
            };
        }]);
})();
