'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogEditCtrl
 * @description
 * # BlogEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('BlogEditCtrl', function ($scope, $routeParams, $location, BlogFactory) {
        $scope.editBlog = true;
        $scope.button="Editar";
        $scope.blog = {};

        BlogFactory.getBlogId($routeParams.id)
            .then(function(data) {
                $scope.blog = data.data
            });

        $scope.saveBlog = function() {
            var formData = new FormData;

            for(var key in $scope.blog) {
                formData.append(key, $scope.blog[key]);
            }

            var file = $('#file')[0].files[0];
            formData.append('image', file);

            BlogFactory.editBlog(formData)
                .then(function() {
                    $location.path('/blogs');
                });
        };

       /* Blog.one($routeParams.id).get().then(function(blog){
            $scope.blog= blog;
            $scope.saveBlog = function() {
                $scope.blog.save().then(function() {
                    $location.path('/blog/' + $routeParams.id);
                });
            };
        });*/
    });
