'use strict';
module.exports = function(grunt) {
    grunt.config('ngAnnotate', {
        dist: {
            files: [
                {
                    expand: true,
                    src: ['.tmp/concat/scripts/*.js'],
                    ext: '.js', // Dest filepaths will have this extension.
                    extDot: 'last',       // Extensions in filenames begin after the last dot
                    
                }
            ]
        },
        component: {
            files: [
                {
                    expand: true,
                    src: ['.tmp/concat/scripts/*.js'],
                    ext: '.js', // Dest filepaths will have this extension.
                    extDot: 'last',       // Extensions in filenames begin after the last dots
                }
            ]
        }
    });
};