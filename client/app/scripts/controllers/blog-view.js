'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogViewCtrl
 * @description
 * # BlogViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('BlogViewCtrl', function ($scope, $routeParams, BlogFactory) {
        $scope.viewBlog = true;

        BlogFactory.getBlogId($routeParams.id).then(function(data) {
            $scope.blog = data.data;
        });

    });
