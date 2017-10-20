(function () {
  "use strict";

  var app = angular.module("todo");

  app.config(["$routeProvider", routeConfig]);

  function routeConfig($routeProvider) {
    $routeProvider
      .when("/todo", {
        templateUrl: "content/templates/todo.html",
        controller: "TodoController",
        controllerAs: "ctrl"
      })
      .when("/about", {
        templateUrl: "content/templates/about.html",
        controller: "AboutController",
        controllerAs: "ctrl"
      })
      .when("/contact", {
        templateUrl: "content/templates/contact.html"
      })
      .when("/login", {
        templateUrl: "content/templates/login.html",
        controller: "LoginController",
        controllerAs: "ctrl"
      })
      .otherwise({
        redirectTo: "/todo"
      });
  }
})();
