(function () {
	'use strict';

	describe('LoginController', function () {
		var controller = null, $scope = null, authServiceMock, $location, $controller;
    beforeEach(angular.mock.module("todo"));

    beforeEach(function(){
      angular.mock.inject(function($controller, _$location_, $rootScope) {
        // create $scope
        $scope = $rootScope.$new();

				//create mock impl
	      authServiceMock = {
					isLoggedIn: function(){}
				};

				$location = _$location_;

				// inject $scope into controller using $controller decorator
				controller = $controller("LoginController", {
					$scope : $scope,
					$location: $location,
					Auth: authServiceMock
				});
      });
    });

		it('Should LoginController must be defined', function () {
			expect(controller).toBeDefined();
		});
	});
})();
