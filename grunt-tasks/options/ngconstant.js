'use strict';
module.exports = function(grunt) {

    var _ = require('lodash'),
        _path = require('path'),
        environmentSetup = grunt.file.readJSON(grunt.config.app + '/config/environment-setup.json');

    var parseConfigurationFiles = function(env) {
        var fileContent,
            environment = env || 'development',
            configBasename,
            configSettingNameMap,
            baseConfigContent,
            overrideConfigContent;

        grunt.file.expand(grunt.config.app + '/config/**/*.json').forEach(function(path) {
            configBasename = _path.basename(path);
            if (configBasename !== 'environment-setup.json' && path.indexOf('/environments/') !== -1) {
                configSettingNameMap = environmentSetup.filemap[configBasename];
                if (typeof configSettingNameMap !== 'undefined') {
                    environmentSetup.environments[configSettingNameMap].fullpath = path;
                    environmentSetup.environments[configSettingNameMap].fileContent = grunt.file.readJSON(path);
                } else {
                    grunt.log.error('Mapping not found between an environment name and the config filename.');
                }
            } else {
                fileContent = grunt.file.readJSON(path);
            }
        });

        baseConfigContent = environmentSetup.environments.base.fileContent;
        overrideConfigContent = environmentSetup.environments[environment].fileContent;
        _.merge(baseConfigContent, overrideConfigContent);

        return {
            CONFIG: baseConfigContent
        };
    };

    grunt.config('ngconstant', {
        options: {
            space: '',
            wrap: '/* jshint quotmark:true, indent:false, white: false */\n// This file was generated at build time on '+new Date()+'\n// Any change here will be lost\n\n\'use strict\';\n\n{%= __ngModule %}',
            name: 'AppConfig',
            dest:  grunt.config.app+'/scripts/config.js'
        },
        development: {
            constants: parseConfigurationFiles('development')
        },
        qa: {
            constants: parseConfigurationFiles('qa')
        },
        staging: {
            constants: parseConfigurationFiles('staging')
        },
        production: {
            constants: parseConfigurationFiles('production')
        }
    });
};
