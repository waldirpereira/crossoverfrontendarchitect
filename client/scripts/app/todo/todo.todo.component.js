(function () {
  "use strict";
  angular.module("todo")
    .component('todoItem', {
      bindings: {
        item: '<',
        delete: '<',
        update: '<',
        save: '<'
      },
      controller: function () {
        var ctrl = this;
      },
      templateUrl: '../../../content/templates/todo-item.html'
    });
})();
