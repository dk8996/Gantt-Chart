'use strict';

module.exports = function(grunt) {
    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        all: [
            // grunt file
            'Gruntfile.js',
            // scripts and subfolders
            '<%= grunt.config.app %>/scripts/**/*.js',
            // tests and subfolders
            '<%= grunt.config.app %>/tests/**/*.js',
            // githooks
            'git-hooks/*.js',
            // grunt tasks and subfolders (options included)
            'grunt-tasks/**/*.js'
        ]
    });
};