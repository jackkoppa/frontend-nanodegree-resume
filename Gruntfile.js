module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dev/css/styles.css': 'dev/scss/styles.scss',
                    'dev/css/base.css': 'dev/scss/base.scss'
                }
            },

            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/styles.css': 'dev/scss/styles.scss',
                    'dist/css/base.css': 'dev/scss/base.scss'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'dev/css/maps/'
                },

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'})
                ]
            },
            dev: {
                src: 'dev/css/*.css'
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['dev/js/config.js', 'resume-data/resume.js', 'dev/js/helper.js', 'dev/js/resumeBuilder.js'],
                dest: 'dist/js/resumeScripts.js',
            },
        },

        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'resume-data',
                    src: 'resume.js',
                    dest: 'dev/js/'
                }]
            },
        },

        watch: {
            refresh: {
                options: {
                    livereload: true
                },
                files: ['dev/index.html','dev/js/*.js','dev/css/*.css']
            },
            dist: {
                tasks: ['concat'],
                files: ['js/*.js']
            }

        },

        connect: {
            dev: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: 'dev',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                    }
                }
            },
            dist: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: 'dist',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                    }
                }
            }

        }
    });

    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['sass','postcss','concat','clean','responsive_images','copy']);
    grunt.registerTask('serveDev', ['copy:dev','connect:dev:livereload','watch:refresh']);
    grunt.registerTask('serveDist', ['connect:dist:livereload','watch:refresh','watch:dist']);

};