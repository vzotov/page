app.controller( 'projectsController', ['$scope', '$q', 'JSONData', function ( $scope, $q, JSONData ) {
    var scopeProjects,
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
        },
        getProjects = function () {
            return JSONData( 'projects' );
        },
        getSkills = function () {
            return JSONData( 'skills' );
        },
        renderProjects = function (projectsData) {
            $scope.projects = projectsData.data;
        },
        renderSkills = function (skillsData) {
            $scope.projects = mergeProjectsAndSkills( $scope.projects, skillsData.data );
        };

    getProjects()
        .then( renderProjects )
        .then( getSkills )
        .then( renderSkills );
}] );