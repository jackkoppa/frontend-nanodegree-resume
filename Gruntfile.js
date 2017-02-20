module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            resume: {
                files: [{
                    expand: true,
                    cwd: 'resume-data',
                    src: 'resume.js',
                    dest: 'dev/js/'
                }]
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'dev/js',
                    src: 'jquery-3.1.1.min.js',
                    dest: 'dist/js/'
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

            prod: {
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
            prod: {
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
                separator: '\n',
            },
            dev: {
                src: ['dev/es2015/config.js', 'resume-data/resume.js', 'dev/es2015/helper.js', 'dev/es2015/resumeBuilder.js'],
                dest: 'dev/es2015/resumeScripts.js',
            },
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'dev/es2015',
                    src: ['*.js'],
                    dest: 'dev/js',
                    ext: '.js'
                }]
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: ['$']
                },
                compress: {
                    drop_console: true
                }
            },
            prod: {
                files: {
                    'dist/js/resumeScripts.min.js': ['dev/js/resumeScripts.js']
                }
            }
        },

        jshint: {
            options: {
                globals: {
                    "$": true,
                    "google": true
                },
                browser: true,
                devel: true,
                sub: true,
                strict: "global"
            },
            dev: ['dev/js/resumeScripts.js']
        },

        processhtml: {
            options: {
            },

            prod: {
                files: {
                    'dist/index.html': ['dev/index.html']
                }
            }
        },

        connect: {
            dev: {
                options: {
                    port: 8000,
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
            prod: {
                options: {
                    port: 8080,
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

    /*
    configuring watch dynamically, so that multiple watch tasks can be set for
    dev & prod, separately
    */
    // watch task (livereload) common to all watch instances
    grunt.config.merge({
        watch: {
            options: {
                livereload: true
            },
            refresh: {
                files: ['dev/index.html','dev/js/*.js','dev/css/*.css']
            }
        }
    });

    // watch for dev server
    grunt.registerTask('watchDev', function () {
        grunt.config.merge({
            watch: {
                devJS: {
                    files: 'dev/es2015/*.js',
                    tasks: ['concat','babel','jshint']
                },
                devSCSS: {
                    files: ['dev/scss/*.scss'],
                    tasks: ['sass:dev','postcss:dev']
                }
            }
        });

        grunt.task.run('watch');
    });

    // watch for prod server
    grunt.registerTask('watchProd', function () {
        grunt.config.merge({
            watch: {
                prodJS: {
                    files: 'dev/es2015/*.js',
                    tasks: ['concat','babel','jshint','uglify']
                },
                prodSCSS: {
                    files: ['dev/scss/*.scss'],
                    tasks: ['sass:prod','postcss:prod']
                },
                prodHTML: {
                    files: 'dev/index.html',
                    tasks: ['processhtml']
                }
            }
        });

        grunt.task.run('watch');
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['copy','sass','postcss','concat','babel','uglify','jshint','processhtml']);
    grunt.registerTask('serveDev', ['copy:resume','sass:dev','postcss:dev','concat','babel','jshint','connect:dev','watchDev']);
    grunt.registerTask('serveProd', ['copy','sass:prod','postcss:prod','concat','babel','uglify','jshint','processhtml','connect:prod','watchProd']);

};