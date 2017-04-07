#!/usr/bin/env node

var path = require('path');
var buildiumAngularDocs = require('@buildium/angular-docs');
var ghPages = process.argv.indexOf('--gh-pages') !== -1;

buildiumAngularDocs({
    scripts: [
        '//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js',
        'index.js'
    ],
    title: 'Buildium : Angular Elements',
    sourceFiles: [
        path.join(__dirname, '../src/**/*.js'),
        path.join(__dirname, '../index.js')
    ],
    destination: path.join(__dirname, '../docs'),
    ghPages: ghPages
});