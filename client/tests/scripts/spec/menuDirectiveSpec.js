(function () {
  'use strict';

  describe('menu directive', function() {
	  var $rootScope, $compile, $scope, templateServiceMock, element, $q;

    beforeEach(module('todo'));

    beforeEach(module(function($provide){
      templateServiceMock = {getTemplate:{}};

      $provide.factory('TemplateService', function(){
        return templateServiceMock;
      })
    }));

	  beforeEach(inject(function ($injector) {
  		$rootScope = $injector.get('$rootScope');
  		$compile = $injector.get('$compile');
  		$scope = $rootScope.$new();
      $q = $injector.get("$q");

      spyOn(templateServiceMock, "getTemplate").and.returnValue($q.when({}));

      element = angular.element("<todo-menu />");
      $compile(element)($scope);
      $scope.$digest();
	  }));

    it('should have made a call to getTemplate', function(){
      expect(templateServiceMock.getTemplate).toHaveBeenCalled();
    });
  });
}());
