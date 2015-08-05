'use strict';
module.exports = function(grunt) {
	grunt.config('usemin', {
	    html: ['<%= grunt.config.dist %>/{,*/}*.html'],
	    css: ['<%= grunt.config.dist %>/styles/{,*/}*.css'],
	    options: {
	        dirs: [grunt.config.dist]
	    }
	});
};