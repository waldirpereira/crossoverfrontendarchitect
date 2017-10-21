(function () {
	'use strict';

	describe('TodoController', function () {
		var controller = null, $scope = null;
    beforeEach(angular.mock.module("todo"));
    beforeEach(function(){
      angular.mock.inject(function($controller, $rootScope) {
        // create $scope
        $scope = $rootScope.$new();

        // inject $scope into controller using $controller decorator
        controller = $controller("TodoController", {
          $scope : $scope
        });
      });
    });

		it('Should TodoController must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
