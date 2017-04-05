#!/usr/bin/env node

var path = require('path');
var docgen = require('dgeni-alive/src/docgen')();

var packages = [
  require('dgeni-alive/src/packages/jsdoc-ext'),
  require('dgeni-alive/src/packages/ngdoc-ext'),
  require('dgeni-alive/src/packages/links-ext'),
  require('dgeni-alive/src/packages/examples-ext')
];

var configPath = path.join(__dirname, 'docs');

var docs = docgen.Package(packages)

.config(function(log) {
    log.level = 'info';
})

.config(function (generateExamplesProcessor, generateProtractorTestsProcessor) {
    var deployments = {
        name: 'default',
        examples: {
            commonFiles: {
                scripts: [
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js',
                    'index.js'
                  // 'dist/js/vendor.bundle.js',
                  // 'dist/js/app.bundle.js'
                ]
            }
        },
        scripts: [
            '//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js',
            'index.js'
          // '../dist/js/vendor.bundle.js',
          // '../dist/js/app.bundle.js'
        ],
        stylesheets: [
        ]
    };
    generateExamplesProcessor.deployments = [ deployments ];
    generateProtractorTestsProcessor.deployments = [ deployments ];
})

.config(function (renderDocsProcessor) {
    renderDocsProcessor.extraData.deploymentTarget = 'default';
})

.config(function(generateWebsiteProcessor) {
  generateWebsiteProcessor.locals('productTitle', 'Buildium : Angular-UI');
})

.config(function(templateFinder, renderDocsProcessor) {
  templateFinder.templateFolders.unshift(path.resolve(configPath, 'templates/examples'));
  templateFinder.templateFolders.unshift(path.resolve(configPath, 'templates/ngdoc'));
  templateFinder.templateFolders.unshift(path.resolve(configPath, 'templates/app'));
});

var sourceFiles = [
    path.join(__dirname, '../src/**/*.js'),
    path.join(__dirname, '../index.js'),
];

var destination = path.join(__dirname, '../docs');

docgen.src(sourceFiles)
    .dest(destination)
    .generate();