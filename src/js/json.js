angular.module( 'jsonService', ['ngResource'] )
    .factory( 'JSONData', ['$resource', '$q',
        function ( $resource, $q ) {
            var jsonData = function ( fileName ) {
                var jsonData, get;
                get = function () {
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
            };

            return function ( fileName ) {
                return new jsonData( fileName );
            };
        }] );