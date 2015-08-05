'use strict';

module.exports = function (grunt) {
    grunt.config('autoprefixer', {
		options: {
		},
		dev: {
			src: '<%= grunt.config.dist %>/styles/bundle.css',
			dest: '<%= grunt.config.dist %>/styles/bundle.css'
		}
	});
};