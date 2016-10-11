'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogAddCtrl
 * @description
 * # BlogAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('BlogAddCtrl', function ($scope, $location, BlogFactory) {
        $scope.button="Crear";
        $scope.blog = {};
        //$scope.hola = $scope.blog.files[0].name;
        /*$scope.saveBlog = function() {
            BlogFactory.createBlog($scope.blog)
                .then(function() {
                    console.log('Super Exito');
                });
        }*/

        $scope.saveBlog = function() {
            var formData = new FormData;

            for(var key in $scope.blog) {
                formData.append(key, $scope.blog[key]);
            }

            var file = $('#file')[0].files[0];
            formData.append('image', file);

            BlogFactory.createBlog(formData)
                .then(function() {
                    $location.path('/blogs');
                });
        }
    });
