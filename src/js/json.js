angular.module( 'jsonService', ['ngResource'] )
    .factory( 'JSONData', ['$resource', '$q',
        function ( $resource, $q ) {
            var resources = {},
                jsonData = function ( fileName ) {
                    var me = this,
                        get;
                    get = function () {
                        var deferred = $q.defer();

                        if ( !me.jsonData ) {
                            $resource( ['/page/data/resources/', fileName, '.json'].join( '' ) )
                                .get( function ( data ) {
                                    if ( data.success ) {
                                        me.jsonData = data;
                                        deferred.resolve( me.jsonData.data );
                                    }
                                } );
                        } else {
                            deferred.resolve( me.jsonData.data );
                        }

                        return deferred.promise;
                    };
                    return {
                        get: get
                    };
                };

            return function ( fileName ) {
                if ( !resources[fileName] ) {
                    resources[fileName] = new jsonData( fileName );
                }
                return resources[fileName];
            };
        }] );