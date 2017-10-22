(function () {
    angular.module("todo")
        .constant("ROUTES", {
            getAll: "http://localhost:3000/todos",
            auth: "http://localhost:3000/user/auth",
            logout: "http://localhost:3000/user/logout",
            // getTypes: "json/types.json",
            // testingPage: "test.html",
            readmeFile: "README.txt",
            menuTemplate: "content/templates/menu.html"
        });
})();
