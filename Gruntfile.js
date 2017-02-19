module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/styles.css': 'scss/styles.scss',
                    'css/base.css': 'scss/base.scss'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'css/maps/'
                },

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/config.js', 'resume-data/resume.js', 'js/helper.js', 'js/resumeBuilder.js'],
                dest: 'js/resumeScripts.js',
            },
        },

        watch: {
            refresh: {
                options: {
                    livereload: true
                },
                files: ['index.html','js/*.js','css/*.css']
            },
            js: {
                tasks: ['concat'],
                files: ['js/*.js']
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['sass','postcss','concat','clean','responsive_images','copy']);
    grunt.registerTask('serve', ['connect:livereload','watch']);
};