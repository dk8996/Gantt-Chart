'use strict';
module.exports = function(grunt) {
    grunt.config('concurrent', {
        server: [
            'coffee:dist'
        ],
        test: [
            'coffee'
        ],
        dist: [
            'imagemin',
            'htmlmin'
        ]
    });
};