(function () {
	'use strict';

	describe('TodoController', function () {
		var controller = null, $scope = null, authServiceMock, $q, $location, todoServiceMock, deferred;
    beforeEach(angular.mock.module("todo"));

		function emptyPromise() {
      deferred = $q.defer();
			deferred.resolve({});
      return deferred.promise;
    }

    beforeEach(function(){
      angular.mock.inject(function($controller, _$location_, $rootScope, _$q_) {
        // create $scope
        $scope = $rootScope.$new();
				$location = _$location_;
				$q = _$q_;

				authServiceMock = {
					isLoggedIn: emptyPromise,
					getUser: emptyPromise
				};

				todoServiceMock = {
					delete: emptyPromise,
					update: emptyPromise,
					getAll: emptyPromise
				};

        // inject $scope into controller using $controller decorator
        controller = $controller("TodoController", {
          $scope : $scope,
					$location: $location,
					Auth: authServiceMock,
					Todo: todoServiceMock
        });
      });
    });

		it('Should TodoController must be defined', function () {
			expect(controller).toBeDefined();
		});

		it('Should TodoController have properties defined', function () {
			expect(controller.items).toBeDefined();
			expect(controller.handleDrop).toBeDefined();
			expect(controller.delete).toBeDefined();
			expect(controller.update).toBeDefined();
			expect(controller.save).toBeDefined();
			expect(controller.add).toBeDefined();
		});

		it('Should call Todo.delete if current user is the author when deleted was called', function() {
			spyOn(authServiceMock, 'getUser').and.returnValue({username: 'testUser'});
			spyOn(todoServiceMock, 'delete').and.returnValue($q.when({}));

			var item = { _id: 'testId', author: { username: 'testUser' } };
			controller.delete(item);

			expect(todoServiceMock.delete).toHaveBeenCalled();
		});

		it('Should call Todo.update on handleDrop if item exists on list', function() {
			spyOn(authServiceMock, 'getUser').and.returnValue({username: 'testUser'});
			spyOn(todoServiceMock, 'update').and.returnValue($q.when({}));

			var item = { _id: 'testId', author: { username: 'testUser' } };
			controller.items.push(item);
			controller.handleDrop(item._id, 'newStatus');

			expect(todoServiceMock.update).toHaveBeenCalled();
		});

		it('Should push new item to items array when add is called', function() {
			spyOn(authServiceMock, 'getUser').and.returnValue({username: 'testUser'});

			expect(controller.items.length).toBe(0);
			controller.add();
			expect(controller.items.length).toBe(1);
			var itemAdded = controller.items[0];

			expect(itemAdded._id).toBeUndefined();
			expect(itemAdded.author.username).toBe('testUser');
		});

		it('Should change editMode to true when update is called', function() {
			spyOn(authServiceMock, 'getUser').and.returnValue({username: 'testUser'});

			var item = { editMode: false, author: { username: 'testUser' } };
			controller.update(item);

			expect(item.editMode).toBe(true);
		});	
	});
})();
