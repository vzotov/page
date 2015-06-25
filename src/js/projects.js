app.controller( 'projectsController', ['$scope', 'JSONData', function ( $scope, JSONData ) {
    var scopeProjects = [],
        mergeProjectsAndSkills = function ( projects, skills ) {
            projects.forEach( function ( project ) {
                project.skills = _.map( project.skills, function ( skillId ) {
                    if ( _.isString( skillId ) ) {
                        return _.find( skills, function ( skill ) {
                                return skill.id === skillId;
                            } ) || {name: skillId};
                    } else {
                        return skillId;
                    }
                } );
            } );
            return projects;
        };

    JSONData( 'projects' )
        .then( function ( projects ) {
            scopeProjects = projects.data;
            JSONData( 'skills' )
                .then( function ( skills ) {
                    $scope.projects = mergeProjectsAndSkills( scopeProjects, skills.data );
                } );
        } );

}] );