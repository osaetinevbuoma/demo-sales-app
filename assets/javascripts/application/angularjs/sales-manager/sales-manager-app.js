'use strict';

(function () {
    angular.module('salesManagerApp', ['ngRoute', 'ngSanitize', 'salesManagerControllers', 'salesManagerDirectives']).
        config(['$routeProvider', function ($routeProvider) {

            // redirect user back to login page if not authenticated
            var authenticate = ['$window', function ($window) {
                if (!$window.sessionStorage.authenticatedUser && !$window.sessionStorage.sessionId) {
                    $window.location = 'index.html';
                }
            }];

            $routeProvider.
                when('/dashboard', {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'DashboardController',
                    resolve: { authenticate: authenticate }
            }).
                when('/sales-total-per-sales-man', {
                templateUrl: 'partials/sales-total-per-sales-man.html',
                controller: 'SalesTotalPerSalesManController',
                resolve: { authenticate: authenticate }
            }).
                when('/sales-total-per-month', {
                templateUrl: 'partials/sales-total-per-month.html',
                controller: 'SalesTotalPerMonthController',
                resolve: { authenticate: authenticate }
            }).
                when('/top-5-sales-orders', {
                templateUrl: 'partials/top-5-sales-orders.html',
                controller: 'Top5SalesOrdersController',
                resolve: { authenticate: authenticate }
            }).
                when('/top-5-sales-men', {
                templateUrl: 'partials/top-5-sales-men.html',
                controller: 'Top5SalesMenController',
                resolve: { authenticate: authenticate }
            }).
                otherwise({
                    redirectTo: '/dashboard'
            });
        }]).
        run(['$rootScope', function ($rootScope) {
            $rootScope.authenticatedUser = sessionStorage.authenticatedUser;
        }]);
})();