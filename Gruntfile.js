module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'src/css/main.css': 'src/scss/all.scss'       // 'destination': 'source'
                }
            }
        },
        watch: {
            options: {
                livereload: 9000
            },
            sass: {
                files: 'src/scss/*.scss',
                tasks: ['sass']
            },
            html: {
                files: 'src/**/*.html'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', []);

};