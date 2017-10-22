(function(){
  'use strict';

  describe('draggable directive', function() {
    var $window, listeners, $rootScope, $compile, $scope, element, compiledElement, nativeElement;

    beforeEach(angular.mock.module('todo'));

    beforeEach(inject(function ($injector) {
  		$rootScope = $injector.get('$rootScope');
  		$compile = $injector.get('$compile');
  		$scope = $rootScope.$new();
      $window = $injector.get('$window');

      element = angular.element("<div draggable />");
      nativeElement = element[0];
      spyOn(nativeElement, 'addEventListener').and.callThrough();

      compiledElement = $compile(element)($scope);
      $scope.$digest();
	  }));

    it('addEventListener should register dragstart', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('dragstart', jasmine.any(Function), false);
    });

    it('addEventListener should register dragend', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('dragend', jasmine.any(Function), false);
    });
  });

  describe('droppable directive', function() {
    var $window, listeners, $rootScope, $compile, $scope, element, compiledElement, nativeElement;

    beforeEach(angular.mock.module('todo'));

    beforeEach(inject(function ($injector) {
  		$rootScope = $injector.get('$rootScope');
  		$compile = $injector.get('$compile');
  		$scope = $rootScope.$new();
      $window = $injector.get('$window');

      element = angular.element("<div droppable />");
      nativeElement = element[0];
      spyOn(nativeElement, 'addEventListener').and.callThrough();

      compiledElement = $compile(element)($scope);
      $scope.$digest();
	  }));

    it('addEventListener should register dragover', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('dragover', jasmine.any(Function), false);
    });

    it('addEventListener should register dragenter', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('dragenter', jasmine.any(Function), false);
    });

    it('addEventListener should register dragleave', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('dragleave', jasmine.any(Function), false);
    });

    it('addEventListener should register drop', function() {
      expect(nativeElement.addEventListener).toHaveBeenCalledWith('drop', jasmine.any(Function), false);
    });
  });
})();
