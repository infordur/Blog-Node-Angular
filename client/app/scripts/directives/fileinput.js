'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:fileInput
 * @description
 * # fileInput
 */
angular.module('clientApp')
    .directive('fileInput', function ($parse) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.bind('change', function(){
                    $parse(attrs.fileInput)
                    .assign(scope, element[0].files)
                    scope.$apply();
                });
            }
        };
  });
