(function () {
	'use strict';

	describe('MainController', function () {
		var controller = null, $scope = null, authServiceMock, $q, $location, deferred;
    beforeEach(angular.mock.module("todo"));

		function emptyPromise() {
      deferred = $q.defer();
			deferred.resolve({});
      return deferred.promise;
    }

    beforeEach(function(){
      angular.mock.inject(function($controller, $rootScope, _$location_, _$q_) {
        // create $scope
        $scope = $rootScope.$new();
				$location = _$location_;
				$q = _$q_;

				authServiceMock = {
					isLoggedIn: emptyPromise,
					logout: emptyPromise,
					getUsername: emptyPromise,
					getUser: emptyPromise
				};

        // inject $scope into controller using $controller decorator
        controller = $controller("MainController", {
          $scope : $scope,
					$location: $location,
					Auth: authServiceMock
        });
      });
    });

		it('Should MainController must be defined', function () {
			expect(controller).toBeDefined();
		});

		it('Should call Auth.isLoggedIn when isLoggedIn was called', function() {
			spyOn(authServiceMock, 'isLoggedIn').and.returnValue($q.when({}));

			controller.isLoggedIn();

			expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
		});

		it('Should call Auth.getUsername when getUsername was called', function() {
			spyOn(authServiceMock, 'getUsername').and.returnValue($q.when({}));

			controller.getUsername();

			expect(authServiceMock.getUsername).toHaveBeenCalled();
		});

		it('Should call Auth.logout when logout was called', function() {
			spyOn(authServiceMock, 'logout').and.returnValue($q.when({}));

			controller.logout();

			expect(authServiceMock.logout).toHaveBeenCalled();
		});

		it('Should return true if passed location is the current when isActive is called', function() {
			spyOn($location, 'path').and.returnValue('actualPath');

			var isActive = controller.isActive('actualPath');

			expect(isActive).toBe(true);
		});

	});
})();
