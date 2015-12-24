'use strict';

(function () {
    angular.module('AuthenticationServices', []).
    factory('Authenticate', ['$http', function ($http) {
        return {
            login: function (userObject, callback) {
                $http.get('http://localhost:8080/login', { params: userObject }).success(callback);
            }
        }
    }]);
})();