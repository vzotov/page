app.controller( 'projectsController', ['$scope', 'projectsData', 'skillsData', function ( $scope, projectsData, skillsData ) {
    var scopeProjects = [],
        mergeProjectsAndSkills = function ( projects, skills ) {
            projects.forEach( function ( project ) {
                project.skills = _.map( project.skills, function (skillId) {
                    return _.find(skills, function ( skill ) {
                        return skill.id === skillId;
                    }) || {name: skillId};
                } );
            } );
            return projects;
        };
    projectsData
        .get()
        .then( function ( projects ) {
            scopeProjects = projects;
        } )
        .then( skillsData.get )
        .then( function ( skills ) {
            $scope.projects = mergeProjectsAndSkills( scopeProjects, skills );
        } );
}] );