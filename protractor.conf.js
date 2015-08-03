'use strict';
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    directConnect: true,

    // URL of the app you want to test.
    baseUrl: 'http://localhost:9000/',

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    specs: ['./app/tests/e2e/navigation.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        isVerbose: true, // List all tests in the console
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};
