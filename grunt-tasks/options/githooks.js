/**
 * Created by g.baigorria on 28/02/14.
 */
'use strict';
module.exports = function(grunt) {
    grunt.config('githooks', {
        stage: {
            options:{
                template: 'git-hooks/pre-commit.js'
            },
            'pre-commit': 'git-commit',
            'pre-push': 'git-push'
        }
    });
};
