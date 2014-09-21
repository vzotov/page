app.controller( 'projectsController', ['$scope', 'projectsData', function ( $scope, projectsData ) {
    projectsData.get( function ( data ) {
        if(data.success) {
            $scope.projects = data.data;
        }
    });
}] );