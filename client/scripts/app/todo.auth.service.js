(function () {
  "use strict";

  angular.module("todo")
    .factory('Auth', ['$window', '$http', '$httpParamSerializer', 'ROUTES', "md5", AuthFactory]);

  function AuthFactory($window, $http, $httpParamSerializer, ROUTES, md5){
    var user = {};

    function getUser() {
      if (user && user.sessionId) {
          return user;
      }
      var storageUser = $window.localStorage.getItem('user');
      if (storageUser) {
        try {
          user = JSON.parse(storageUser);
        } catch (e) {
          $window.localStorage.removeItem('user');
        }
      }
      return user;
    }

    return {
      getUser: function() {
        return getUser();
      },
      setUser : function(aUser){
        user = aUser;
        $window.localStorage.setItem('user', JSON.stringify(user));
      },
      isLoggedIn : function(){
        var currentUser = getUser();
        return currentUser && currentUser.sessionId ? currentUser : false;
      },
      getUsername: function(){
        if (!user || !user.sessionId)
          return null;
        return user.username;
      },
      login: function(credentials) {
        var credentialsWithMd5 = {
          username: credentials.username,
          password: md5.createHash(credentials.password)
        };
        return $http({
            method: 'POST',
            url: ROUTES.auth,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: credentialsWithMd5
        }).then(returnDataFromXhr, returnDataFromXhr);
      },
      logout: function() {
        return $http.get(ROUTES.logout + '?sessionId=' + user.sessionId)
          .then(function(response) {
            $window.localStorage.removeItem('user');
            return response.data;
          }, function (response) {
            $window.localStorage.removeItem('user');
            return response.data;
          });
      }
    };
  }

  function returnDataFromXhr(response) {
    return response.data;
  }
})();
