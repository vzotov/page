module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        sass: {
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    sourcemap: true
                },
                files: {                         // Dictionary of files
                    'build/css/main.css': 'src/scss/all.scss'       // 'destination': 'source'
                }
            }
        },
        jshint: {
            src: ['src/js/*.js']
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
            },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['concat', 'jshint']
            },
            resources: {
                files: 'data/resources/**/*'
            }
        },
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'build/js/app.js'
            },
            options: {
                sourceMap: true
            }
        }
    } );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    // Default task(s).
    grunt.registerTask( 'dev', ['sass', 'concat', 'jshint'] );

    grunt.registerTask( 'default', ['dev'] );
    grunt.registerTask( 'watch', ['sass', 'concat', 'jshint', 'watch'] );

};