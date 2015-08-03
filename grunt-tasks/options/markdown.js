'use strict';
module.exports = function(grunt) {
    grunt.config('markdown', {
        readme: {
            options:{
                template: 'README.tpl',
                markdownOptions: {
                    gfm: true,
                    highlight: 'manual',
                    codeLines: {
                        before: '<span>',
                        after: '</span>'
                    }
                }
            },
            files: [
                {
                    expand: true,
                    src: 'README.md',
                    dest: '.',
                    ext: '.html'
                }
            ]
        }
    });
};