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