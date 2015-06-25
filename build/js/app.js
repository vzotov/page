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
    '$scope', '$rootScope', '$route', 'JSONData',
    function ( $scope, $rootScope, $route, JSONData ) {
        $scope.$on( '$routeChangeStart', function ( next, current ) {
            $rootScope.isHomePage = current.$$route.isHomePage;
        } );
    }] );
angular.module( 'jsonService', ['ngResource'] )
    .factory( 'JSONData', ['$resource',
        function ( $resource ) {
            var resources = {};

            return function ( fileName ) {
                if ( !resources[fileName] ) {
                    resources[fileName] = $resource( ['/page/data/resources/', fileName, '.json'].join( '' ) ).get().$promise;
                }
                return resources[fileName];
            };
        }] );
app.controller( 'projectsController', ['$scope', '$q', 'JSONData', function ( $scope, $q, JSONData ) {
    var scopeProjects,
        mergeProjectsAndSkills = function ( projects, skills ) {
            projects.forEach( function ( project ) {
                project.skills = _.map( project.skills, function ( skillId ) {
                    if ( _.isString( skillId ) ) {
                        return _.find( skills, function ( skill ) {
                                return skill.id === skillId;
                            } ) || {name: skillId};
                    } else {
                        return skillId;
                    }
                } );
            } );
            return projects;
        },
        getProjects = function () {
            return JSONData( 'projects' );
        },
        getSkills = function () {
            return JSONData( 'skills' );
        },
        renderProjects = function (projectsData) {
            $scope.projects = projectsData.data;
        },
        renderSkills = function (skillsData) {
            $scope.projects = mergeProjectsAndSkills( $scope.projects, skillsData.data );
        };

    getProjects()
        .then( renderProjects )
        .then( getSkills )
        .then( renderSkills );
}] );
//# sourceMappingURL=app.js.map