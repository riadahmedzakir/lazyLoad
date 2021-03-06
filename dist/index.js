var app = angular.module('testApp', ['ngRoute', 'oc.lazyLoad']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/test-1/view/test-1.view.html',
            controller: 'test1Controller',
            controllerAs: "vm",
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'app/test-1/scripts/test-1.js'
                        ]
                    });
                }]
            }
        })
        .when('/details', {
            templateUrl: 'app/test-2/view/test-2.view.html',
            controller: 'test2Controller',
            controllerAs: "vm",
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'app/test-2/scripts/test-2.js'
                        ]
                    });
                }]
            }
        })
        .otherwise({
            templateUrl: '404.html',
        })
});

app.run(function () {

})