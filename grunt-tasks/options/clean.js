'use strict';
module.exports = function(grunt) {
    grunt.config('clean', {
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%= grunt.config.dist %>/*',
                    '!<%= grunt.config.dist %>/.git*'
                ]
            }]
        },
        hybrid: {
            files: [{
                dot: true,
                src: [
                    '<%= grunt.config.hybrid %>/*'
                ]
            }]
        },
        www: {
            files: [{
                dot: true,
                src: [
                    '<%= grunt.config.hybrid %>/www/*'
                ]
            }]
        }
    });
};