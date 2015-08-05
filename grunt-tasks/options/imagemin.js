'use strict';
module.exports = function(grunt) {
	grunt.config('imagemin', {
	    dist: {
            options: {
                optimizationLevel: 7
            },
	        files: [{
	            expand: true,
	            cwd: '<%= grunt.config.app %>/resources/images',
                src: '{,*/}*.{png,jpg,jpeg}',
	            dest: '<%= grunt.config.dist %>/resources/images'
	        }]
	    }
	});
};