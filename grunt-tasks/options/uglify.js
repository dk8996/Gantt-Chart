'use strict';
module.exports = function(grunt) {
	grunt.config('uglify', {
	    dist: {
	        files: {
	            '<%= grunt.config.dist %>/scripts/scripts.js': [
	                '<%= grunt.config.dist %>/scripts/scripts.js'
	            ]
	        }
	    },
        component: {
            files: {
                '<%= grunt.config.dist %>/scripts/scripts.js': [
                    '<%= grunt.config.dist %>/scripts/scripts.js'
                ]
            }
        }
	});
};