'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RegistroCtrl
 * @description
 * # RegistroCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('RegistroCtrl', function ($scope, $location, UserFactory) {

        $scope.register = function() {
            UserFactory.createUser($scope.user)
                .then(function() {
                    $location.path('/blogs');
                });
        }

    });
