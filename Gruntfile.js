module.exports = function(grunt) {
    // list of ES files that should be compiled by Babel
    var es2015Files = [
        'dev/es2015/config.js',
        'dev/es2015/resume.js',
        'dev/es2015/templates.js',
        'dev/es2015/helper.js',
        'dev/es2015/interaction.js',
        'dev/es2015/resumeBuilder.js',
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        name: "480",
                        width: "480",
                        quality: 100
                    },{
                        name: "640",
                        width: "640",
                        quality: 100
                    },{
                        name: "900",
                        width: "900",
                        quality: 100
                    },{
                        name: "1200",
                        width: "1200",
                        quality: 100
                    }
                    ]
                },

                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.jpg'],
                    dest: 'dev/responsive_images'
                }]
            }
        },

        copy: {
            dev: {
                files: [
                    // pull resume.js from resume-data submodule, so its data can be used
                    {expand: true, cwd: 'resume-data', src: 'resume.js', dest: 'dev/es2015'},

                    // copy over external scripts to avoid using Babel on them (jQuery & jquery.modal)
                    {expand: true, cwd: 'dev/es2015/external', src: '*.js', dest: 'dev/js/external'}
                ]
            },
            beforeResponsive: {
                files: [
                    // images from resume-data repo
                    {expand: true, cwd: 'resume-data/img', src: ['**/*','!**/*.db'], dest: 'img'}
                ]
            },
            afterResponsive: {
                files: [
                    // copy any images "missed" (purposefully) by responsive_images task,
                    // into dev/responsive_images directory
                    {expand: true, cwd: 'project_img', src: ['**/*','!**/*.db'], dest: 'dev/responsive_images'},
                    {expand: true, cwd: 'img', src: ['**/*.{png,gif,svg}'], dest: 'dev/responsive_images'}
                ]
            },
            dist: {
                files: [
                    // to make sure jQuery is included in production, even though it's not compiled
                    {expand: true, cwd: 'dev/js/external', src: '*.js', dest: 'dist/js'},

                    // copy entire dev/responsive_images directory
                    {expand: true, cwd: 'dev/responsive_images', src: ['**/*','!**/*.db'], dest: 'dist/responsive_images'},

                    // copy entire fonts directory
                    {expand: true, cwd: 'dev/font', src: '**/*', dest: 'dist/font'}
                ]
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
                    src: ['*.scss','external/jquery_modal.scss'],
                    dest: 'dev/css',
                    ext: '.css'
                }]
            },

            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.min.css': 'dev/scss/styleDist.scss',
                    'dist/css/jquery_modal.min.css': 'dev/scss/external/jquery_modal.scss'
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
                    ]
                },
                src: 'dist/css/*.css'
            }
        },

        // concat js files, primarily for easy linting purposes (with all variables in same file)
        concat: {
            options: {
                separator: '\n'
            },

            // in development, this is just for easy linting. Task is also used in production build,
            // to create final minified .js file
            dev: {
                src: es2015Files,
                dest: 'dev/es2015/resumeScripts.js'
            }
        },

        babel: {
            // all js development done within dev/es2015 directory to use new features,
            // then compiled to dev/js for actual use in the browseer
            options: {
                sourceMap: true,
                presets: ['es2015']
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

        clean: {
            // to avoid confusion when developing, deletes the concatenated es2015 file
            // & resume.js (from resume-data), after they are used by babel
            dev: ['dev/es2015/resumeScripts.js','dev/es2015/resume.js'],

            // could be periodically run to clean out responsive_images directories,
            // which are not flushed on each run of the responsive_images task
            images: ['img','dev/responsive_images','dist/responsive_images'],

            // remove remaining "compiled" files, not covered above
            remaining: ['dist','dev/css','dev/js','.sass-cache']
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
            // for ease of comparing declared variables, only lints the concatenated file,
            // even though the development index.html is drawing from its source files for easy Chrome debugging
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
            options: {
                hostname: 'localhost',
                livereload: 35729,
                open: true
            },
            dev: {
                options: {
                    port: 8000,
                    base: 'dev'
                }
            },
            prod: {
                options: {
                    port: 8080,
                    base: 'dist',
                    livereload: false,
                    keepalive: true
                }
            }
        },

        watch: {
            options: {
                livereload: false
            },
            refresh: {
                files: ['dev/index.html','dev/js/*.js','dev/css/*.css'],
                options: {
                    livereload: true
                }
            },
            devJS: {
                files: 'dev/es2015/*.js',
                tasks: ['copy:dev','concat','babel','clean:dev','jshint']
            },
            devSCSS: {
                files: ['dev/scss/*.scss'],
                tasks: ['sass:dev','postcss:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['copy:dev','copy:beforeResponsive','responsive_images','copy:afterResponsive','copy:dist','sass','postcss','concat','babel','clean:dev','uglify','jshint','processhtml']);
    grunt.registerTask('serveDev', ['copy:dev','copy:beforeResponsive','responsive_images','copy:afterResponsive','sass:dev','postcss:dev','concat','babel','clean:dev','jshint','connect:dev','watch']);
    grunt.registerTask('serveProd', ['copy:dev','copy:beforeResponsive','responsive_images','copy:afterResponsive','copy:dist','sass:prod','postcss:prod','concat','babel','clean:dev','uglify','processhtml','connect:prod']);

    // could be periodically run to clean out responsive_images directories,
    // which are not flushed on each run of the responsive_images task
    grunt.registerTask('cleanImages', ['clean:images']);

    // to clean *everything* not included with the initial repo (allows testing build scripts from scratch)
    grunt.registerTask('cleanNuclear', ['clean:dev','clean:images','clean:remaining']);

};
