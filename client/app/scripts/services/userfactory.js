'use strict';

/**
 * @ngdoc service
 * @name clientApp.userFactory
 * @description
 * # userFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('UserFactory', function ($http) {
        // Service logic
        var url = 'http://localhost:3000/api/users';
        var LOCAL_TOKEN_KEY = 'tkn';
        var isAuthenticated = false;
        var authToken;


        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Define el token como un header para las peticiones
            //$http.defaults.headers.common.Authorization = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            //$http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }


        var UserFactory = {
            login: function(obj) {
                return $http.post(url+'/login', obj)
                    .success(function(data) {
                        storeUserCredentials(data);
                    })
                    .error(function(err) {
                        console.log(err);
                    })
            },
            logout: function() {
                destroyUserCredentials();
            },

            loadUserCredentials: function() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if(token) {
                    useCredentials(token);
                }else{
                    console.log('error');
                }
            },
            createUser: function(obj){
                return $http.post(url, obj)
                        .success(function(data) {
                            console.log(data);
                        })
                        .error(function(err) {
                            console.log(err);
                        })
            },


            isAuthenticated: function(){
                return isAuthenticated;
            }
        }

        // Public API here
        return UserFactory;
    });
