(function () {
    "use strict";
    angular.module("todo")
        .component('todoItem', {
            bindings: {
                item: '<',
                delete: '<',
                update: '<'
            },
            controller: function () {
                var ctrl = this;
            },
            template: [
                "<div id='{{ $ctrl.item._id }}' class='panel panel-default todo-item' draggable ng-dblclick=\"$ctrl.update($ctrl.item)\">",
                  "<div class=\"panel-body\">",
                    "<div class=\"pull-right\">",
                      "<a ng-click=\"$ctrl.delete($ctrl.item)\"><span class=\"glyphicon glyphicon-remove remove\" aria-hidden=\"true\"></span></a>",
                    "</div>",
                    "<h4><strong>{{$ctrl.item.title}}</strong></h4>",
                    "<div ng-bind-html=\"$ctrl.item.description\"></div>",
                    "<div class=\"pull-right\">",
                      "{{$ctrl.item.author.username}}",
                    "</div>",
                  "</div>",
                "</div>"
            ].join("")
        });
})();
