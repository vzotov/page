angular.module( 'jsonService', ['ngResource'] )
    .factory( 'JSONData', function ( $resource, $q ) {
        var get, jsonData;
        get = function ( fileName ) {
            var deferred = $q.defer();

            if ( !jsonData ) {
                $resource( ['/page/data/resources/', fileName, '.json'].join( '' ) )
                    .get( function ( data ) {
                        if ( data.success ) {
                            jsonData = data;
                            deferred.resolve( jsonData.data );
                        }
                    } );
            } else {
                deferred.resolve( jsonData.data );
            }

            return deferred.promise;
        };

        return {
            get: get
        };
    } );