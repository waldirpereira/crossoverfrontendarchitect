(function () {
    "use strict";

    var app = angular.module("todo");

    app.controller("TodoController", ["$window", "$location", "Auth", "Todo", TodoController]);

    function TodoController($window, $location, Auth, Todo) {
      var ctrl = this;

      ctrl.handleDrop = handleDrop;
      ctrl.delete = deleteItem;
      ctrl.update = update;

      init();

      function init() {
        var user = Auth.getUser();
        if (!Auth.isLoggedIn()) {
          $location.path('/login');
          return;
        }
        Todo.getAll(user.sessionId)
          .then(function(data) {
            if (data && data.status === 'error') {
              $location.path('/login');
            }
            ctrl.items = data.data;
          })
          .catch(function(data) {
          $location.path('/login');
          });
      }

      function handleDrop(id, containerSelectorId) {
        console.log('Item ' + id + ' dropped on ' + containerSelectorId);
      }

      function deleteItem(item) {
        console.log("delete " + item._id);
      }
      function update(item) {
        console.log("update " + item._id + " from " + item.author.username);
      }
    }
})();
