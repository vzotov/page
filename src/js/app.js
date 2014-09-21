var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home-page.html'
            }).
            when('/projects', {
                templateUrl: 'partials/projects.html'
            }).
            otherwise({
                redirectTo: '/404'
            });
    }]);