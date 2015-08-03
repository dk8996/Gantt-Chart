'use strict';
module.exports = function(grunt) {
    grunt.config('replace', {
        appcache: {
            options: {
                patterns: [{
                    match: /<html>/g,
                    replacement: '<html manifest="manifest.appcache">'
                }],
                force: true
            },
            files: [{
                src: ['dist/index.html'],
                dest: './'
            }]
        }
    });
};