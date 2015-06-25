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