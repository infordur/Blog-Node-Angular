'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngRoute',
        'angularUtils.directives.dirPagination'
        //'restangular',
    ])
    .config(function ($routeProvider/*, RestangularProvider*/) {
        //RestangularProvider.setBaseUrl('http://localhost:3000');

        $routeProvider
            .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
        })
        .when('/blogs', {
            templateUrl: 'views/blogs.html',
            controller: 'BlogsCtrl',
        })
        .when('/create/blog', {
            templateUrl: 'views/blog-add.html',
            controller: 'BlogAddCtrl',
        })
        .when('/blog/:id', {
            templateUrl: 'views/blog-view.html',
            controller: 'BlogViewCtrl',
        })
        .when('/blog/:id/delete', {
            templateUrl: 'views/blog-delete.html',
            controller: 'BlogDeleteCtrl',
        })
        .when('/blog/:id/edit', {
            templateUrl: 'views/blog-edit.html',
            controller: 'BlogEditCtrl',
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    /*.factory('BlogRestangular', function (Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer){
            RestangularConfigurer.setRestangularFields({
                id:'_id'
            });
        });
    })
    .factory('Blog', function (BlogRestangular) {
        return BlogRestangular.service('blog');
    });*/
