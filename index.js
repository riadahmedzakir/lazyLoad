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
                            'app/test-1/controller/test-1.controller.js',
                            'app/test-1/service/test-1.service.js'
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
                            'app/test-2/controller/test-2.controller.js',
                            'app/test-2/controller/test-2.modal.controller.js',
                            'app/test-2/service/test-2.service.js'
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