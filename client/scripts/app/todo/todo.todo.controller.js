(function () {
    "use strict";

    var app = angular.module("todo");

    app.controller("TodoController", ["$location", TodoController]);

    function TodoController($location) {
      var ctrl = this;

      ctrl.items = [
        {id: 1, title: 'aaa', status: 'in-progress'},
        {id: 2, title: 'bbb', status: 'in-progress'},
        {id: 3, title: 'ccc', status: 'in-progress'},
        {id: 4, title: 'ddd', status: 'in-progress'},
        {id: 5, title: 'xxx', status: 'completed'},
        {id: 6, title: 'yyy', status: 'completed'},
        {id: 7, title: 'zzz', status: 'completed'}
      ];

      ctrl.handleDrop = function(id, containerSelectorId) {
        console.log('Item ' + id + ' dropped on ' + containerSelectorId);
      };
    }
})();
