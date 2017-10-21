describe('Routes tests', function () {
  var ROUTES = {};

  beforeEach(module('todo', function ($provide) {
      $provide.constant('ROUTES', ROUTES);
  }));

  describe('Considering isLoggedIn == true', function() {
    // mock out Auth with a fake one
    beforeEach(module(function ($provide) {
     //create mock impl
     var mockAuth = {
       isLoggedIn: function(){
         return true;
         }
      }

      $provide.value('Auth', mockAuth); // use $provide to swap the real $location with our mock
    }));

    var location, route, rootScope;

    beforeEach(inject(function (_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
    }));

    beforeEach(inject(function ($httpBackend) {
        $httpBackend.expectGET('content/templates/todo.html')
          .respond(200);
        $httpBackend.flush();
        $httpBackend.expectGET('content/templates/about.html')
          .respond(200);
    }));

    it('Should load the Todo page on successful load of /todo and with TodoController', function () {
        location.path('/todo');
        rootScope.$digest();
        expect(route.current.controller).toBe('TodoController');
    });

    it('Should load the about page on successful load of /about and with AboutController', function () {
        location.path('/about');
        rootScope.$digest();
        expect(route.current.controller).toBe('AboutController');
    });

    it('Should load the tests page on successful load of /tests and without controller', function () {
        location.path('/tests');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the coverage page on successful load of /coverage and without controller', function () {
        location.path('/coverage');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the contact page on successful load of /contact and without controller', function () {
        location.path('/contact');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the login page on successful load of /login and with LoginController', function () {
        location.path('/login');
        rootScope.$digest();
        expect(route.current.controller).toBe('LoginController');
    });

    it('Should load the Todo page on access root page', function () {
        location.path('/');
        rootScope.$digest();
        expect(route.current.controller).toBe('TodoController');
    });
  });

  describe('Considering isLoggedIn == false', function() {
    // mock out Auth with a fake one
    beforeEach(module(function ($provide) {
     //create mock impl
     var mockAuth = {
       isLoggedIn: function(){
         return false;
         }
      }

      $provide.value('Auth', mockAuth); // use $provide to swap the real $location with our mock
    }));

    var location, route, rootScope;

    beforeEach(inject(function (_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
    }));

    it('Should load the Login page on load of /todo and with LoginController when not logged in', function () {
        location.path('/todo');
        rootScope.$digest();
        expect(route.current.controller).toBe('LoginController');
    });

    it('Should load the About page on successful load of /about and with AboutController when not logged in', function () {
        location.path('/about');
        rootScope.$digest();
        expect(route.current.controller).toBe('AboutController');
    });

    it('Should load the Tests page on successful load of /tests and without controller when not logged in', function () {
        location.path('/tests');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the Coverage page on successful load of /coverage and without controller when not logged in', function () {
        location.path('/coverage');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the contact page on successful load of /contact and without controller when not logged in', function () {
        location.path('/contact');
        rootScope.$digest();
        expect(route.current.controller).toBe();
    });

    it('Should load the Login page on successful load of /login and with LoginController when not logged in', function () {
        location.path('/login');
        rootScope.$digest();
        expect(route.current.controller).toBe('LoginController');
    });

    it('Should load the Login page on access root page and with LoginController when not logged in', function () {
        location.path('/');
        rootScope.$digest();
        expect(route.current.controller).toBe('LoginController');
    });
  });
});
