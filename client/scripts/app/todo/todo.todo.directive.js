(function () {
    "use strict";

    var app = angular.module("todo");

    app.directive('draggable', function() {
      return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
          'dragstart',
          function(e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('Text', this.id);
            this.classList.add('drag');
            return false;
          },
          false
        );

        el.addEventListener(
          'dragend',
          function(e) {
            this.classList.remove('drag');
            return false;
          },
          false
        );
      }
    });

    app.directive('droppable', function() {
      return {
        scope: {
          drop: '&', // parent
          container: '=' // bi-directional scope
        },
        link: function(scope, element) {
          // again we need the native object
          var el = element[0];

          el.addEventListener(
            'dragover',
            function(e) {
              e.dataTransfer.dropEffect = 'move';
              // allows us to drop
              if (e.preventDefault) e.preventDefault();
              this.classList.add('over');
              return false;
            },
            false
          );

          el.addEventListener(
            'dragenter',
            function(e) {
              this.classList.add('over');
              return false;
            },
            false
          );

          el.addEventListener(
            'dragleave',
            function(e) {
              this.classList.remove('over');
              return false;
            },
            false
          );

          el.addEventListener(
            'drop',
            function(e) {
              this.classList.remove('over');
              var containerId = this.id;
              var item = document.getElementById(e.dataTransfer.getData('Text'));
              this.appendChild(item);
              // call the passed drop function
              scope.$apply(function(scope) {
                  var fn = scope.drop();
                  if ('undefined' !== typeof fn) {
                    fn(item.id, containerId);
                  }
              });
            },
            false
          );
        }
      }
    });
})();
