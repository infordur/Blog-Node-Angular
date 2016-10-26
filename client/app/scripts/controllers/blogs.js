'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogsCtrl
 * @description
 * # BlogsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BlogsCtrl', function ($scope, $http, BlogFactory, UserFactory) {

    //$scope.blogs = {};

    BlogFactory.getBlogs().then(function(data) {
        $scope.blogs = data.data;
    });
    //$scope.blogs = Blog.getList().$object;

    //console.log(UserFactory.isAuthenticated);

  });
