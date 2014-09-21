angular.module( 'jsonService', ['ngResource'] )
    .factory( 'projectsData', function ( $resource ) {
        return $resource( '/page/data/resources/projects.json' );
    } )
    .factory( 'skillsData', function ( $resource ) {
        var skills = [],
            getSkills;
        $resource( '/page/data/resources/skills.json' ).get( function ( data ) {
            skills = data.data;
        } );

        getSkills = function () {
            return skills;
        };

        filterSkills = function ( filterArray ) {
            var match = _.filter( skills, function ( skill ) {
                return filterArray.indexOf( skill.id ) >= 0;
            } );
            return match;
        };

        return {
            get   : getSkills,
            filter: filterSkills
        };
    } );