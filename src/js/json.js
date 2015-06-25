angular.module( 'jsonService', ['ngResource'] )
    .factory( 'JSONData', ['$resource',
        function ( $resource ) {
            var resources = {},
                jsonData = function ( fileName ) {
                    return $resource( ['/page/data/resources/', fileName, '.json'].join( '' ) ).get().$promise;
                };

            return function ( fileName ) {
                if ( !resources[fileName] ) {
                    resources[fileName] = new jsonData( fileName );
                }
                return resources[fileName];
            };
        }] );