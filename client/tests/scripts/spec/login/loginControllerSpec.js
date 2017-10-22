(function () {
	'use strict';

	describe('LoginController', function () {
		var controller = null, $scope = null, authServiceMock, $location, $controller, $q;
    beforeEach(angular.mock.module("todo"));

		beforeEach(module(function($provide){
			authServiceMock = {
				isLoggedIn: {},
				login: {}
			};

      $provide.factory('Auth', function(){
        return authServiceMock;
      })
    }));

    beforeEach(function(){
      angular.mock.inject(function($controller, _$location_, $rootScope, _$q_) {
        // create $scope
        $scope = $rootScope.$new();
				$location = _$location_;
				$q = _$q_;

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

		it('Should LoginController have properties defined', function () {
			expect(controller.error).toEqual(false);
			expect(controller.submitted).toEqual(false);
			expect(controller.credentials).toEqual({});
			expect(controller.submit).toBeDefined();
			expect(controller.login).toBeDefined();
		});

		it('Should call login if form is valid when submit was called', function() {
			spyOn(controller, 'login').and.returnValue(null);
			$scope.loginForm = {$invalid:false};
			expect(controller.submitted).toEqual(false);
			expect(controller.error).toEqual(false);

			controller.submit();

			expect(controller.error).toEqual(false);
			expect(controller.submitted).toEqual(true);
			expect(controller.login).toHaveBeenCalled();
		});

		it('Should return if form is invalid when submit was called', function() {
			spyOn(controller, 'login').and.returnValue(null);
			$scope.loginForm = {$invalid:true};
			expect(controller.submitted).toEqual(false);
			expect(controller.error).toEqual(false);

			controller.submit();

			expect(controller.error).toEqual(true);
			expect(controller.submitted).toEqual(true);
			expect(controller.login).not.toHaveBeenCalled();
		});


		it('Should call Auth.login when login was called', function() {
			spyOn(authServiceMock, 'login').and.returnValue($q.when({}));

			controller.login();

			expect(authServiceMock.login).toHaveBeenCalled();
		});
	});
})();
