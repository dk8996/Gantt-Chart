'use strict';
module.exports = function(grunt) {
    grunt.config('cssmin', {
        // By default, your `index.html` <!-- Usemin Block --> will take care of
        // minification. This option is pre-configured if you do not wish to use
        // Usemin blocks.
        dist: {
            files: {
                '<%= grunt.config.dist %>/styles/bundle.css': [
                    '<%= grunt.config.app %>/styles/{,*/}*.css'
                ]
            }
        }
    });
};