'use strict';

/**
 * @ngdoc service
 * @name clientApp.BlogFactory
 * @description
 * # BlogFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('BlogFactory', function ($http, $routeParams) {
    // Service logic
    var url = 'http://localhost:3000/api/blogs';

    var BlogFactory = {
        getBlogs: function() {
            return $http.get(url)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    console.log(err);
                })
        },

        getBlogId: function(id) {
            return $http.get(url + '/' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    console.log(err);
                })
        },

        createBlog: function(obj) {
            console.log(obj);
            return $http.post(url, obj, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
              }).success(function(data) {
                    console.log('Exito');
                })
                .error(function(err) {
                    console.log(err);
                })

        },

        editBlog: function(obj) {
            console.log(obj);
            return $http.put(url + '/' + $routeParams.id, obj, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function(data) {
                    console.log('Exito');
            })
            .error(function(err) {
                console.log(err);
            })
        }
    }

    // Public API here
    return BlogFactory;

  });
