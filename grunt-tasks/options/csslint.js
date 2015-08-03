'use strict';
module.exports = function(grunt) {
    grunt.config('csslint', {
        options: {
            //https://github.com/stubbornella/csslint/wiki/Rules
            csslintrc: '.csslintrc'
        },
        all:[
            '<%= grunt.config.app %>/styles/bundle.css'
        ]
    });
};