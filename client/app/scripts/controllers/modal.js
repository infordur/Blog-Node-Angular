'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ModalctrlCtrl
 * @description
 * # ModalctrlCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ModalCtrl', function ($scope, $location, $route, UserFactory) {

        $scope.registerPage = function() {
            $('#loginModal').modal('hide');
            $location.path("/registro");
        };

        $scope.authenticate = function() {
            UserFactory.login($scope.user)
                .then(function() {
                    $('#loginModal').modal('hide');
                    $route.reload();
                    $location.path('/');

                });
        }


    });
