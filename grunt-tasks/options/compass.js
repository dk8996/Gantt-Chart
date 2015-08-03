'use strict';

module.exports = function(grunt){
    grunt.config('compass', {
        dev: {
            options: {
                sassDir: ['<%= grunt.config.app %>/styles'],
                cssDir: '<%= grunt.config.app %>/styles',
                outputStyle: 'expanded', //nested, expanded, compact, compressed.
                noLineComments: true
            }
        },
        dist: {
            options: {
                sassDir: ['<%= grunt.config.app %>/styles'],
                cssDir: '<%= grunt.config.app %>/styles',
                outputStyle: 'compressed', //nested, expanded, compact, compressed.
                noLineComments: true
            }
        },
        clean: {
            sassDir: ['<%= grunt.config.app %>/styles'],
            cssDir: '<%= grunt.config.app %>/styles',
            clean: true
        }
    });
};