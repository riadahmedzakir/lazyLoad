(function () {
    angular.module('testApp').config(function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'Test1',
                files: [
                    'app/test-1/test-1.js'
                ],
            }],
        });
    });
}());

(function () {
    angular.module('testApp').config(function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'Test2',
                files: [
                    'app/test-2/test-2.js'
                ],
            }],
        });
    });
}());