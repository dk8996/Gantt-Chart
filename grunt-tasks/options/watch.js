'use strict';

module.exports = function(grunt) {
    grunt.config('watch', {
        options: {
            livereload: grunt.config.LIVERELOAD_PORT
        },
        scritps: {
            files: [
                '<%= grunt.config.app %>/scripts/{,**/}*.js'
            ],
            livereload: true
        },
        css: {
            files: [
                '<%= grunt.config.app %>/styles/{,*/}*.scss'
            ],
            livereload: true,
            tasks: ['compass:dev', 'csslint']
        },
        html: {
            files: [
                '<%= grunt.config.app %>/index.html',
                '<%= grunt.config.app %>/scripts/*/views/{,**/}*.html'
            ],
            livereload: true
        },
        images: {
            files: [
                '<%= grunt.config.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
            ],
            livereload: true
        }
    });
};