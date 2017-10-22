(function(){
  'use strict';

  var app = angular.module('todo');

  app.factory('Todo', ['$http', 'ROUTES', TodoFactory]);

  function TodoFactory($http, ROUTES) {
    return {
      getAll: function(sessionId) {
        return $http.get(ROUTES.getAll + '?sessionId=' + sessionId)
          .then(returnDataFromXhr, returnDataFromXhr);
      }
    };

    function returnDataFromXhr(response) {
      return response.data;
    }
  }
})();
