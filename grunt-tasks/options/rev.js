'use strict';
module.exports = function(grunt) {
    grunt.config('rev', {
        dist: {
            files: {
                src: [
                    '<%= grunt.config.dist %>/scripts/{,*/}*.js',
                    '<%= grunt.config.dist %>/styles/{,*/}*.css',
                    '<%= grunt.config.dist %>/styles/fonts/*'
                ]
            }
        }
    });
};