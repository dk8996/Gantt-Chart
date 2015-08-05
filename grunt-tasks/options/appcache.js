'use strict';

module.exports = function (grunt) {
    grunt.config('appcache', {
        options: {
            basePath: 'dist'
        },
        all: {
            dest: 'dist/manifest.appcache',
            cache: [
                'dist/*.{js,html}',
                'dist/scripts/**/*.js',
                'dist/styles/*.css',
                'dist/resources/fonts/**',
                'dist/resources/images/**/*.{gif,webp,svg,png,jpg,jpeg}'
            ],
            network: '*',
            fallback: '/ /offline.html'
        }
    });
};
