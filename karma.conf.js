// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-typescript'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    files: [
      { pattern: "test/**/*.spec.ts", watched: false },
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript" // *.tsx for React Jsx
    },
    junitReporter: {
      useBrowserName: false,
      outputFile: 'test-results.xml'
    },
    angularCli: {
      environment: 'dev'
    },
    karmaTypescriptConfig: {
      tsconfig: "tsconfig.json"
    },
    reporters: ['progress', 'junit', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
