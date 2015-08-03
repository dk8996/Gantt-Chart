'use strict';
module.exports = function(grunt) {
    grunt.config('htmlmin', {
        dist: {
            options: {
            },
            files: [{
                expand: true,
                cwd: '<%= grunt.config.app %>',
                src: ['scripts/*/views/{,*/}*.html', 'index.html'],
                dest: '<%= grunt.config.dist %>'
            }]
        }
    });
};