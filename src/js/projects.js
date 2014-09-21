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