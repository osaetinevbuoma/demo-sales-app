'use strict';

angular.module('AuthenticationControllers', ['AuthenticationServices']).
    controller('LoginController', ['$scope', '$rootScope', '$sce', '$window', 'Authenticate', function ($scope, $rootScope, $sce, $window,
                                                                                                        Authenticate) {
    $scope.login = function () {
        Authenticate.login($scope.user, function (data) {
            if (data.loginSucceeded === true) {
                var sessionObject = { username: $scope.user.username, sessionId: data.sessionId };
                sessionStorage.authenticatedUser = sessionObject.username;
                sessionStorage.sessionId = sessionObject.sessionId;

                $rootScope.authenticatedUser = sessionObject;
                $window.location = 'home.html';
            } else {
                $scope.response = $sce.trustAsHtml('<div class="alert alert-danger">' +
                    '<i class="fa fa-exclamation-triangle"> Wrong username/password combination.</i> </div>');
            }
        });
    };
}]);