'use strict';
module.exports = function(grunt) {

    grunt.config('protractor', {
        e2e: {
            configFile: 'protractor.conf.js', // Default config file
            keepAlive: false, // If false, the grunt process stops when the test fails.
            noColor: false, // If true, protractor will not use colors in its output.
            args: {
                // Arguments passed to the command
            }
        }
    });
};






