'use strict';
module.exports =  function(grunt) {
	grunt.config('useminPrepare', {
	    html: '<%= grunt.config.app %>/index.html',
	    options: {
	        dest: '<%= grunt.config.dist %>'
	    }
	});
};