module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'resume-data',
                    src: 'resume.js',
                    dest: 'dev/js/'
                }]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'dev/scss',
                    src: ['*.scss'],
                    dest: 'dev/css',
                    ext: '.css'
                }]
            },

            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.min.css': 'dev/scss/styleDist.scss'
                }
            }
        },

        postcss: {
            dev: {
                options: {
                    map: {
                        inline: false,
                        annotation: 'dev/css/maps/'
                    },

                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'})
                    ]
                },
                src: 'dev/css/*.css'
            },
            dist: {
                options: {
                    map: false,

                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'})
                        // if sass can handle minification, should uninstall cssnano
                        // require('cssnano')(),
                    ]
                },
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

        uglify: {
            dist: {
                files: {
                    'dist/resumeScripts.min.js': [
                        'dev/js/config.js',
                        'resume-data/resume.js',
                        'dev/js/helper.js',
                        'dev/js/resumeBuilder.js'
                    ]
                }
            }
        },

        processhtml: {
            options: {
            },

            dist: {
                files: {
                    'dist/index.html': ['dev/index.html']
                }
            }
        },

        watch: {
            scssDev: {
                tasks: ['sass:dev','postcss:dev'],
                files: ['dev/scss/*.scss']
            },
            scssDist: {
                tasks: ['sass:dist','postcss:dist','processhtml'],
                files: ['dev/scss/*.scss']
            },
            jsDist: {
                tasks: ['uglify','processhtml'],
                files: ['dev/js/*.js']
            },
            refresh: {
                options: {
                    livereload: true
                },
                files: ['dev/index.html','dev/js/*.js','dev/css/*.css']
            },

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
                    port: 8090,
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

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['sass','postcss','concat','clean','responsive_images','copy']);
    grunt.registerTask('serveDev', ['copy:dev','sass:dev','postcss:dev','connect:dev','watch:scssDev','watch:refresh']);
    grunt.registerTask('serveDist', ['sass:dist','postcss:dist','uglify','processhtml','connect:dist:livereload','watch:scssDist','watch:jsDist','watch:refresh']);

};