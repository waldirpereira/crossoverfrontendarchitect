(function () {
  "use strict";

  angular.module("todo")
    .factory('Auth', function(){
      var user;

      return {
        setUser : function(aUser){
          user = aUser;
        },
        isLoggedIn : function(){
          return(user)? user : false;
        },
        getUsername: function(){
          if (!user)
            return null;
          return user.username;
        },
        login: function(credentials) {
          if (credentials.username !== 'test')
            return {};

          return {
            status: 'success',
            username: 'test',
            sessionId: '123asd123asd123asd'
          };
        },
        logoff: function() {
          return true;
        }
      };
    });
})();
