(function () {
	'use strict';

	describe('AboutController', function () {
		var controller = null, $scope = null;
    beforeEach(angular.mock.module("todo"));
    beforeEach(function(){
      angular.mock.inject(function($controller, $rootScope) {
        // create $scope
        $scope = $rootScope.$new();

        // inject $scope into controller using $controller decorator
        controller = $controller("AboutController", {
          $scope : $scope
        });
      });
    });

		it('Should AboutController must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
