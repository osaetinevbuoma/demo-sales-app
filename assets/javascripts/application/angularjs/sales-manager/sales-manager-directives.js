'use strict';

var canvasHeight = 285;
var canvasWidth = 480;
var host = 'http://localhost:8080';

var resize = function (element) {
    return element.parents('.box').resizable({
        maxHeight: canvasHeight,
        minHeight: canvasHeight,
        maxWidth: canvasWidth
    });
};

var showLegend = function (element, chart) {
    return element.parent('.box-body').find('#legend').html(chart.generateLegend());
};

angular.module('salesManagerDirectives', []).
    directive('pieChartCanvas', ['$http', function ($http) {
        var makeChart = function (element) {
            $http.get(host + '/salesmandata', { params: { sessionid: sessionStorage.sessionId } }).success(function (data) {
                var chartData = [];

                if (data.resultDescription == 'SUCCESS') {
                    var colors = [
                        {
                            color: "#f56954",
                            highlight: "#f56954"
                        },
                        {
                            color: "#00a65a",
                            highlight: "#00a65a"
                        },
                        {
                            color: "#f39c12",
                            highlight: "#f39c12"
                        },
                        {
                            color: "#00c0ef",
                            highlight: "#00c0ef"
                        },
                        {
                            color: "#3c8dbc",
                            highlight: "#3c8dbc"
                        },
                        {
                            color: "#d2d6de",
                            highlight: "#d2d6de"
                        }
                    ];

                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].push(colors[i].color);
                        data.data[i].push(colors[i].highlight);

                        var object = {
                            value: parseInt(data.data[i][1]),
                            color: colors[i].color,
                            highlight: colors[i].highlight,
                            label: data.data[i][0]
                        };

                        chartData.push(object);
                    }
                }

                //var data = JSON.parse(attr.pieChartCanvas);
                //var data = attr.pieChartCanvas;
                var options = {
                    //Boolean - Whether we should show a stroke on each segment
                    segmentShowStroke: true,
                    //String - The colour of each segment stroke
                    segmentStrokeColor: "#fff",
                    //Number - The width of each segment stroke
                    segmentStrokeWidth: 2,
                    //Number - The percentage of the chart that we cut out of the middle
                    percentageInnerCutout: 0, // This is 0 for Pie charts
                    //Number - Amount of animation steps
                    animationSteps: 100,
                    //String - Animation easing effect
                    //animationEasing: "easeOutBounce",
                    //Boolean - Whether we animate the rotation of the Doughnut
                    animateRotate: true,
                    //Boolean - Whether we animate scaling the Doughnut from the centre
                    animateScale: false,
                    //Boolean - whether to make the chart responsive to window resizing
                    responsive: true,
                    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                    maintainAspectRatio: true,
                    //String - A legend template
                    legendTemplate: "<ul class=\"list-inline\"><% for (var i=0; i<segments.length; i++){%><li>" +
                    "<span style=\"color:<%=segments[i].fillColor%>;\" class=\"fa fa-circle\"></span> " +
                    "<%if(segments[i].label){%><%=segments[i].label%><%}%>" +
                    "</li><%}%></ul>",
                    onAnimationComplete: function () {
                        showLegend(element, this);
                    }
                };

                var canvas = element.get(0).getContext('2d');
                var chart = new Chart(canvas);
                chart.Pie(chartData, options);

                resize(element); // make .box resizable
            });
        };

        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            scope: { refreshChart: '=' },
            replace: true,
            link: function (scope, element) {
                makeChart(element); // first time chart

                // remake chart when refresh is clicked
                $(element).parents('.box').find('.refresh').on('click', function (event) {
                    event.preventDefault();
                    return makeChart(element);
                });
            }
        }
}]).
    directive('barChartCanvas', ['$http', function ($http) {
        var makeChart = function (element) {
            $http.get(host + '/lastyeardata', { params: { sessionid: sessionStorage.sessionId } }).success(function (data) {
                if (data.resultDescription === 'SUCCESS') {
                    var chartData = {
                        labels: [],
                        datasets: [
                            {
                                label: "Sales Men",
                                fillColor: "#7474d9",
                                strokeColor: "#7474d9",
                                pointColor: "#7474d9",
                                pointStrokeColor: "#c1c7d1",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "#7474d9",
                                data: []
                            }
                        ]
                    };

                    for (var i = 0; i < data.data.length; i++) {
                        chartData.labels.push(data.data[i][0]);
                        chartData.datasets[0].data.push(data.data[i][1]);
                    }

                    resize(element); // make .box resizable

                    var canvas = element.get(0).getContext('2d');
                    var chart = new Chart(canvas);

                    var options = {
                        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                        scaleBeginAtZero: true,
                        //Boolean - Whether grid lines are shown across the chart
                        scaleShowGridLines: true,
                        //String - Colour of the grid lines
                        scaleGridLineColor: 'rgba(0,0,0,.05)',
                        //Number - Width of the grid lines
                        scaleGridLineWidth: 1,
                        //Boolean - Whether to show horizontal lines (except X axis)
                        scaleShowHorizontalLines: true,
                        //Boolean - Whether to show vertical lines (except Y axis)
                        scaleShowVerticalLines: true,
                        //Boolean - If there is a stroke on each bar
                        barShowStroke: true,
                        //Number - Pixel width of the bar stroke
                        barStrokeWidth: 2,
                        //Number - Spacing between each of the X value sets
                        barValueSpacing: 5,
                        //Number - Spacing between data sets within X values
                        barDatasetSpacing: 1,
                        //String - A legend template
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li>" +
                        "<span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%>" +
                        "</li><%}%></ul>",
                        //Boolean - whether to make the chart responsive
                        responsive: true,
                        maintainAspectRatio: true
                    };

                    options.datasetFill = false;
                    chart.Bar(chartData, options);
                }
            });
        };

        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            replace: true,
            link: function (scope, element) {
                makeChart(element); // first time chart

                // remake chart when refresh is clicked
                $(element).parents('.box').find('.refresh').on('click', function (event) {
                    event.preventDefault();
                    return makeChart(element);
                });
            }
        }
}]);