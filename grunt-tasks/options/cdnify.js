'use strict';
module.exports = function(grunt){
	grunt.config('cdnify',{
	    dist: {
	        html: ['<%= grunt.config.dist %>/*.html']
	    }
	});
};