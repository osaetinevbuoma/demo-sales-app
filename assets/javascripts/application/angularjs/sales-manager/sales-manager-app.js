'use strict';

(function () {
    angular.module('salesManagerApp', ['ngRoute', 'ngSanitize', 'salesManagerControllers', 'salesManagerDirectives']).
        config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $httpProvider.interceptors.push(function () {
                return {
                    request: function (config) {
                        if (sessionStorage.authenticatedUser === null) {
                            return window.location = 'index.html';
                        }

                        return config;
                    }
                }
            });

            $routeProvider.
                when('/dashboard', {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'DashboardController'
            }).
                when('/sales-total-per-sales-man', {
                templateUrl: 'partials/sales-total-per-sales-man.html',
                controller: 'SalesTotalPerSalesManController'
            }).
                when('/sales-total-per-month', {
                templateUrl: 'partials/sales-total-per-month.html',
                controller: 'SalesTotalPerMonthController'
            }).
                when('/top-5-sales-orders', {
                templateUrl: 'partials/top-5-sales-orders.html',
                controller: 'Top5SalesOrdersController'
            }).
                when('/top-5-sales-men', {
                templateUrl: 'partials/top-5-sales-men.html',
                controller: 'Top5SalesMenController'
            }).
                otherwise({
                    redirectTo: '/dashboard'
            });
        }]);
})();