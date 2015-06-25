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
    .factory( 'projectsData', function ( $resource ) {
        return $resource( '/page/data/resources/projects.json' );
    } )
    .factory( 'skillsData', function ( $resource ) {
        var skills = [],
            getSkills;
        $resource( '/page/data/resources/skills.json' ).get( function ( data ) {
            skills = data.data;
        } );

        getSkills = function () {
            return skills;
        };

        filterSkills = function ( filterArray ) {
            var match = _.filter( skills, function ( skill ) {
                return filterArray.indexOf( skill.id ) >= 0;
            } );
            return match;
        };

        return {
            get   : getSkills,
            filter: filterSkills
        };
    } );
app.controller( 'projectsController', ['$scope', 'projectsData', 'skillsData', function ( $scope, projectsData, skillsData ) {
    projectsData.get( function ( data ) {
        var projects = [],
            skills = [],
            parsedSkills = [],
            skill;
        if ( data.success ) {
            //parsing skills at project
            projects = data.data;
            angular.forEach( projects, function ( project ) {
                skills = project.skills;
                project.skills = skillsData.filter( skills );
                
            } );
            $scope.projects = data.data;
        }
    } );
}] );
//# sourceMappingURL=app.js.map