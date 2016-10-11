'use strict';

describe('Controller: BlogsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var BlogsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogsCtrl = $controller('BlogsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlogsCtrl.awesomeThings.length).toBe(3);
  });
});
