var app = angular.module( 'app', ['ngRoute', 'ngResource', 'jsonService'] );

app.config( ['$routeProvider',
    '$resourceProvider',
    function ( $routeProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl: 'partials/home-page.html',
                isHomePage: true
            } )
            .when( '/about', {
                templateUrl: 'partials/about.html'
            } )
            .when( '/projects', {
                templateUrl: 'partials/projects.html',
                controller: 'projectsController'
            } )
            .otherwise( {
                redirectTo: '/'
            } );
    }] );

app.controller( 'appController', [
    '$scope', '$rootScope', '$route', 'projectsData', 'skillsData',
    function ( $scope, $rootScope, $route, projectsData, skillsData ) {
        $scope.$on( '$routeChangeStart', function ( next, current ) {
            $rootScope.isHomePage = current.$$route.isHomePage;
        } );
    }] );
angular.module( 'jsonService', ['ngResource'] )
    .factory( 'projectsData', function ( $resource, $q ) {
        var deferred = $q.defer();

        $resource( '/page/data/resources/projects.json' )
            .get( function ( data ) {
                if ( data.success ) {
                    deferred.resolve( data.data );
                }
            } );

        return {
            get: function () {
                return deferred.promise;
            }
        };
    } )
    .factory( 'skillsData', function ( $resource, $q ) {
        var deferred = $q.defer();

        $resource( '/page/data/resources/skills.json' ).get( function ( data ) {
            if ( data.success ) {
                deferred.resolve( data.data );
            }
        } );

        return {
            get: function () {
                return deferred.promise;
            }
        };
    } );
app.controller( 'projectsController', ['$scope', 'projectsData', 'skillsData', function ( $scope, projectsData, skillsData ) {
    var scopeProjects = [],
        mergeProjectsAndSkills = function ( projects, skills ) {
            projects.forEach( function ( project ) {
                project.skills = _.map( project.skills, function (skillId) {
                    return _.find(skills, function ( skill ) {
                        return skill.id === skillId;
                    }) || {name: skillId};
                } );
            } );
            return projects;
        };
    projectsData
        .get()
        .then( function ( projects ) {
            scopeProjects = projects;
        } )
        .then( skillsData.get )
        .then( function ( skills ) {
            $scope.projects = mergeProjectsAndSkills( scopeProjects, skills );
        } );
}] );
//# sourceMappingURL=app.js.map