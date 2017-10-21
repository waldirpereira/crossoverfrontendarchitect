(function () {
    "use strict";

    angular.module("todo")
        .controller("AboutController", ["$location", AboutController]);

    function AboutController($location) {
        var ctrl = this;

        ctrl.profiles = [
          { title: 'Stack Overflow', url: 'http://stackoverflow.com/users/4784342/waldir-j-pereira-junior?tab=profile' },
          { title: 'GitHub', url: 'https://github.com/waldirpereira' },
          { title: 'LinkedIn', url: 'https://www.linkedin.com/in/waldir-j-pereira-junior-83aa564/' }
        ];

        ctrl.title = 'Hi! My name is Waldir J. Pereira Junior.';
    }
})();
