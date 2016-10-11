'use strict';

describe('Service: BlogFactory', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var BlogFactory;
  beforeEach(inject(function (_BlogFactory_) {
    BlogFactory = _BlogFactory_;
  }));

  it('should do something', function () {
    expect(!!BlogFactory).toBe(true);
  });

});
