(function () {
    angular.module("todo")
        .constant("ROUTES", {
            getAll: "http://localhost:3000/todos",
            auth: "http://localhost:3000/user/auth",
            logout: "http://localhost:3000/user/logout",
            update: "http://localhost:3000/todo",
            delete: "http://localhost:3000/todo",
            readmeFile: "README.txt",
            menuTemplate: "content/templates/menu.html"
        });
})();
