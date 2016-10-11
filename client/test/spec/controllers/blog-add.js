'use strict';

describe('Controller: BlogAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var BlogAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogAddCtrl = $controller('BlogAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlogAddCtrl.awesomeThings.length).toBe(3);
  });
});
