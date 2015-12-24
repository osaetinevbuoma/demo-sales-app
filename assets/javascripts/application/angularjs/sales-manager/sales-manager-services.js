'use strict';

(function () {
    angular.module('salesManagerServices', []).
        factory('SalesManagerService', ['http', function ($http) {

        var host = 'http://localhost:8080';

        return {
            // Get the total sales per sales men
            getSalesTotalPerSalesMan: function (sessionId, callback) {
                $http.get(host + '/salesmandata', { params: { sessionid: sessionId } }).success(callback);
            },

            // Get the total sales per month
            getSalesTotalPerMonth: function (sessionId, callback) {
                $http.get(host + '/lastyeardata', { params: { sessionid: sessionId } }).success(callback);
            },

            // Get the top 5 sales order
            getTop5SalesOrder: function (sessionId, callback) {
                $http.get(host + '/topsalesorders', { params: { sessionid: sessionId } }).success(callback);
            },

            // Get the top 5 sales men
            getTop5SalesMen: function (sessionId, callback) {
                $http.get(host + '/topsalesmen', { params: { sessionid: sessionId } }).success(callback);
            }
       };

    }]);
})();