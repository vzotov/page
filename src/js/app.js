var app = angular.module( 'app', ['ngRoute', 'ngResource', 'jsonService'] );

app.config( ['$routeProvider',
    '$resourceProvider',
    function ( $routeProvider ) {
        $routeProvider.
            when( '/', {
                templateUrl: 'partials/home-page.html',
                isHomePage: true
            } ).
            when( '/about', {
                templateUrl: 'partials/about.html'
            } ).
            when( '/projects', {
                templateUrl: 'partials/projects.html',
                controller : 'projectsController'
            } ).
            otherwise( {
                redirectTo: '/'
            } );


    }] );

app.controller( 'appController', [
    '$scope', '$rootScope', '$route', 'projectsData', 'skillsData',
    function ( $scope, $rootScope, $route, projectsData, skillsData ) {
        $scope.$on('$routeChangeStart', function(next, current) {
            $rootScope.isHomePage = current.$$route.isHomePage;
        });
    }] );