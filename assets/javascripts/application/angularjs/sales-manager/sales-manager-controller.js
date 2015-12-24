'use strict';

(function () {

    var host = 'http://localhost:8080'; // remote REST host

    // Get total sales orders
    var totalSalesOrders = function (http, scope) {
        http.get(host + '/topsalesorders', { params: { sessionid: sessionStorage.sessionId } }).success(function (data) {
            if (data.resultDescription === 'SUCCESS') {
                scope.salesOrders = data.data;
            }
        });
    };

    // Get top 5 salesmen
    var topSalesMen = function (http, scope) {
        http.get(host + '/topsalesmen', { params: { sessionid: sessionStorage.sessionId } }).success(function (data) {
            if (data.resultDescription === 'SUCCESS') {
                scope.salesMen = data.data;
            }
        });
    };


    angular.module('salesManagerControllers', []).
    controller('LogoutController', ['$rootScope', '$scope', '$window', '$http', function ($rootScope, $scope, $window, $http) {
        // Logout authenticated user
        $scope.logout = function () {
            // ! Returns with a JSON.parse error for some reason
            // ! Probably issue from backend because other requests (minus logout) works
            /*$http.get(host + '/logout', { params: { sessionid: sessionStorage.sessionId } }).success(function (data) {
                if (data === 'SUCCESS') {
                     sessionStorage.removeItem('authenticatedUser');
                     sessionStorage.removeItem('sessionId');
                     $rootScope.authenticatedUser = null;
                     $window.location = 'index.html';
                }
            });*/
            sessionStorage.removeItem('authenticatedUser');
            sessionStorage.removeItem('sessionId');
            $rootScope.authenticatedUser = null;
            $window.location = 'index.html';
        };
    }]).

    /*Controller for Dashboard*/
    controller('DashboardController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        // jQuery UI sortable
        $('#sortable').sortable({
            placeholder: 'ui-state-highlight'
        });
        $('#sortable').disableSelection();

        // Get top sales orders
        totalSalesOrders($http, $scope);

        // Get top 5 sales men
        topSalesMen($http, $scope);

        // Make box resizeable
        $('.box').resizable({
            maxHeight: canvasHeight,
            maxWidth: canvasWidth,
            minHeight: canvasHeight
        });

        // Close box
        $scope.close = function ($event) {
            $($event.currentTarget).parents('li').slideUp();
        };

        // Refresh tables
        $scope.refreshTable = function (tableType) {
            switch (tableType) {
                case 'salesOrder':
                    $scope.salesOrders = [];
                    totalSalesOrders($http, $scope);
                    break;
                case 'topSalesMen':
                    $scope.salesMen = [];
                    topSalesMen($http, $scope);
                    break;
            }
        };
    }]).

    /*Controller for Sales Per Man*/
    controller('SalesTotalPerSalesManController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    }]).

    /*Controller for Sales Per Month*/
    controller('SalesTotalPerMonthController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    }]).

    /*Controller for Top 5 Orders*/
    controller('Top5SalesOrdersController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        totalSalesOrders($http, $scope);

        // Refresh table
        $scope.refreshTable = function (tableType) {
            $scope.salesOrders = [];
            totalSalesOrders($http, $scope);
        };
    }]).

    /*Controller for Top 5 Sales men*/
    controller('Top5SalesMenController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        topSalesMen($http, $scope);

        // Refresh table
        $scope.refreshTable = function (tableType) {
            $scope.salesMen = [];
            topSalesMen($http, $scope);
        };
    }]);
})();