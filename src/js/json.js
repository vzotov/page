angular.module('jsonService', ['ngResource'])
    .factory('projectsData', function($resource) {
        return $resource('/page/data/resources/projects.json');
    });