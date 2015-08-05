'use strict';
module.exports = function(grunt) {
    // (andres): Keep this command config unchaged. We need to set that --location params
    // to make sure that the services ans scenarios are created inside `./tools/mockey`
    // directory and the path used in the internals XML are relative to that directory
    // and not absolute (with the full path specific to anyone's computer).
    var mockey_command = 'java -jar ./tools/mockey/Mockey.jar --location ./tools/mockey/';
    grunt.config('shell', {
        //async
        'mockey-async':{
            command: mockey_command,
            options: {
                async: true,
                execOptions: {
                    cwd: './'
                }
            }
        },
        //sync
        'mockey':{
            command: mockey_command,
            options: {
                async: false,
                execOptions: {
                    cwd: './'
                }
            }
        },
        options: {
            stdout: true,
            stderr: true,
            failOnError: true
        }
    });
};
