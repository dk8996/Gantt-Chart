'use strict';

module.exports = function (grunt) {
    grunt.config('ngdocs', {
		options: {
			dest: '<%= grunt.config.dist %>/docs'
		},
		all: {
			src: ['<%= grunt.config.app %>/scripts/**/*.js']
		}
	});
};