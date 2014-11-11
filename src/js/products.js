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