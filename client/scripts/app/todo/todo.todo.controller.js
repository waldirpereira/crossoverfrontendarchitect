(function () {
    "use strict";

    var app = angular.module("todo");

    app.controller("TodoController", ["$window", "$location", "Auth", "Todo", TodoController]);

    function TodoController($window, $location, Auth, Todo) {
      var ctrl = this;

      ctrl.handleDrop = handleDrop;
      ctrl.delete = deleteItem;
      ctrl.update = update;
      ctrl.save = save;
      ctrl.add = add;

      ctrl.items = [];

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

      function handleDrop(itemId, containerSelectorId) {
        var item = ctrl.items.filter(function(obj) { return obj._id === itemId; })[0];

        if (!item)
          return;

        var itemDropped = {
          _id: item._id,
          status: containerSelectorId
        }
        ctrl.save(itemDropped, true);
      }

      function add() {
        var currentUser = Auth.getUser();
        var newItem = {
          status: 'notCompleted',
          author: {
            username: currentUser.username
          },
          editMode: true
        }
        ctrl.items.push(newItem);
      }

      function deleteItem(item) {
        var currentUser = Auth.getUser();
        if (currentUser && currentUser.username !== item.author.username) {
          $window.alert('You are not the author of this item!');
          return;
        }

        var itemToBeDeleted = { id: item._id };

        Todo.delete(currentUser, itemToBeDeleted)
          .then(function(response) {
            if (response.status === 'success') {
              ctrl.items = ctrl.items.filter(function(objItem) {
                return objItem._id !== item._id;
              });
              $window.alert("Item deleted.");
            }
          })
          .catch(function(response) {
            $window.alert("Error on update item. Check console for more information.");
            console.log(response);
          });
      }

      function update(item) {
        var currentUser = Auth.getUser();
        if (currentUser && currentUser.username !== item.author.username) {
          $window.alert('You are not the author of this item!');
          return;
        }
        item.editMode = true;
      }

      function save(item, skipAlert) {
        skipAlert = skipAlert || false;
        var currentUser = Auth.getUser();
        item.id = item._id;

        Todo.update(currentUser, item)
          .then(function(response) {
            if (response.status === 'success') {
              if (!skipAlert)
                $window.alert("Item updated.");
              item._id = response.data._id;
              item.editMode = false;
            }
          })
          .catch(function(response) {
            $window.alert("Error on update item. Check console for more information.");
            console.log(response);
          });
      }
    }
})();
