'use strict';
module.exports = function(grunt) {
    grunt.config('bowerInstall', {
        app: {
            ignorePath: '<%= grunt.config.app %>/',
            src: ['<%= grunt.config.app %>/index.html']
        },
        karma: {
            src: 'karma.conf.js',
            fileTypes: {
                js: {
                    block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /'.*\.js'/gi
                    },
                    replace: {
                        js: '\'{{filePath}}\','
                    }
                }
            }
        }
    });
};