var app = angular.module( 'app', ['ngRoute', 'ngResource', 'jsonService'] );

app.config( ['$routeProvider',
    '$resourceProvider',
    function ( $routeProvider ) {
        $routeProvider.
            when( '/', {
                templateUrl: 'partials/home-page.html'
            } ).
            when( '/projects', {
                templateUrl: 'partials/projects.html',
                controller : 'projectsController'
            } ).
            otherwise( {
                redirectTo: '/404'
            } );
    }] );