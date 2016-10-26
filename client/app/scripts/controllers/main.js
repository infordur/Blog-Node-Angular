'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', function ($scope, $location, UserFactory) {

        $scope.logout = function() {
            UserFactory.logout().then(function() {
                $location.path('/');
            });
        }

    });
