(function(){
  'use strict';

  var app = angular.module('todo');

  app.factory('Todo', ['$http', 'ROUTES', TodoFactory]);

  function TodoFactory($http, ROUTES) {
    return {
      getAll: function(sessionId) {
        return $http.get(ROUTES.getAll + '?sessionId=' + sessionId)
          .then(returnDataFromXhr, returnDataFromXhr);
      },

      update: function(user, item) {
        var url = ROUTES.update + "?sessionId=" + user.sessionId;
        return $http({
            method: 'PUT',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: item
        }).then(returnDataFromXhr, returnDataFromXhr);
      },

      delete: function(user, item) {
        var url = ROUTES.delete + "?sessionId=" + user.sessionId;
        return $http({
            method: 'DELETE',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: item
        }).then(returnDataFromXhr, returnDataFromXhr);
      }
    };

    function returnDataFromXhr(response) {
      return response.data;
    }

    function transformRequest(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
  }
})();
