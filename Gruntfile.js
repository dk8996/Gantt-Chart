// Generated on 2013-07-10 using generator-angular 0.3.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // load task timming plugin
    require('time-grunt')(grunt);

    // config
    grunt.config.app = 'app';
    grunt.config.dist = 'dist';
    grunt.config.core = 'core';
    grunt.config.hybrid = 'hybrid-app';
    grunt.config.LIVERELOAD_PORT = 35729;
    grunt.config.SERVER_DEV_PORT = 9000;
    grunt.config.SERVER_DIST_PORT = 9010;

    // load all grunt tasks
    require('jit-grunt')(grunt, {
        shell: 'grunt-shell-spawn',
        ngconstant: 'grunt-ng-constant',
        protractor: 'grunt-protractor-runner',
        useminPrepare: 'grunt-usemin',
        cdnify: 'grunt-google-cdn'
    });

    // load defualts tasks and configs
    grunt.loadTasks('grunt-tasks/');
    grunt.loadTasks('grunt-tasks/options');
};
