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
            when( '/products', {
                templateUrl: 'partials/products.html',
                controller : 'productsController'
            } ).
            when( '/product/:id', {
                templateUrl: 'partials/product.html',
                controller : 'productsController'
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
app.controller( 'productsController', ['$scope', '$routeParams', 'products', function ( $scope, $routeParams, products ) {
    var id = $routeParams.id;

    if ( typeof id !== 'undefined' ) {
        $scope.product = products.get( id );
        $scope.addComment = function () {
            products.addComment( id, $scope.comment );
            $scope.comment = "";
        };
    } else {
        $scope.products = products.get();
        $scope.newProduct = {};
        $scope.add = function () {
            products.add( $scope.newProduct );
            $scope.newProduct = {};
        };
    }
}] );

app.factory( 'products', function () {
    var id = 0,
        def,
        add;

    def = [{
        id         : 0,
        name       : "Product1",
        description: "Super product. You should buy it!",
        comments   : ["wow!", "foo?"]
    }];

    add = function ( product ) {
        def.push( {
            id         : ++id,
            name       : product.name,
            description: product.description,
            comments   : []
        } );
    };


    return {
        get       : function ( id ) {
            if ( id ) {
                return def[id];
            } else {
                return def;
            }
        },
        add       : add,
        addComment: function ( id, comment ) {
            this.get( id ).comments.push( comment );
        }
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