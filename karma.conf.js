// Karma configuration
// Generated on Mon Oct 14 2013 14:16:36 GMT-0300 (ART)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],

        // add this plugin for jasmine matchers
        // https://github.com/JamieMason/Jasmine-Matchers

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'app/bower_components/es5-shim/es5-shim.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/json3/lib/json3.min.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-touch/angular-touch.js',
            'app/bower_components/lodash/dist/lodash.compat.js',
            // endbower
            'node_modules/jasmine-expect/dist/jasmine-matchers.js',
            'app/scripts/{,*/}/*.js',
            'app/scripts/{,*/}controllers/{,*/}*.js',
            'app/scripts/{,*/}services/{,*/}*.js',
            'app/scripts/{,*/}directives/{,*/}/*.js',
            'app/scripts/{,*/}filters/{,*/}*.js',
            'app/tests/unit/{,*/}*.js'
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
