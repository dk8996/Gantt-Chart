'use strict';

module.exports = function (grunt) {
    grunt.config('cordovacli', {
        options: {
            path: 'hybrid-app'
        },
        //Android Build
        cordova_android: {
            options: {
                command: ['create','platform','plugin'],
                platforms: ['android'],
                plugins: ['device','dialogs'],
                path: 'hybrid-app',
                id: 'com.myHybridApp',
                name: 'myHybridApp'
            }
        },
        build_android: {
            options: {
                command: 'build',
                platforms: ['android']
            }
        },
        emulate_android: {
            options: {
                command: 'emulate',
                platforms: ['android'],
                args: ['--target','MyAndroidDevice']
            }
        },
        //IOS Build
        cordova_ios: {
            options: {
                command: ['create','platform','plugin'],
                platforms: ['ios'],
                plugins: ['device','dialogs'],
                path: 'hybrid-app',
                id: 'io.cordova.myHybridApp',
                name: 'myHybridApp'
            }
        },
        build_ios: {
            options: {
                command: 'build',
                platforms: ['ios']
            }
        },
        emulate_ios: {
            options: {
                command: 'emulate',
                platforms: ['ios'],
                args: ['--target', 'iPhone']
            }
        }
        // Run app on physical device
        /*
        run_physical: {
            options: {
                command: 'run',
                platforms: ['android']
            }
        }
        */
    });
};