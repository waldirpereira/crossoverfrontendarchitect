'use strict';

// Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'scripts/vendor/all.min.js',
      'scripts/app/todo.module.js',
      'scripts/app/todo.auth.service.js',
      'scripts/app/todo.run.js',
      'scripts/app/todo.routes.js',
      'scripts/app/todo.template.service.js',
      'scripts/app/todo.controller.js',
      'scripts/app/todo.menu.js',
      'scripts/app/todo/todo.todo.module.js',
      'scripts/app/todo/todo.todo.controller.js',
      'scripts/app/login/todo.login.module.js',
      'scripts/app/login/todo.login.controller.js',
      'scripts/app/about/todo.about.module.js',
      'scripts/app/about/todo.about.controller.js',
      'scripts/app/about/todo.about.directive.js',
      'tests/scripts/vendor/vendor.min.js',
      'tests/scripts/app/todo.tests.result.directive.js',
      'tests/scripts/spec/**/*.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'scripts/app/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'html'],

    coverageReporter: {
      type : 'lcov',
      dir : './content/coverage/',
      subdir: '.'
    },

    htmlReporter: {
      outputFile: './tests/coverage-report.html',
      pageTitle: 'Unit Tests',
      groupSuites: true,
      useCompactStyle: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'PhantomJS'
        // , 'Chrome'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
