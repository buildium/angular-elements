#!/usr/bin/env node

var path = require('path');
var buildiumAngularDocs = require('@buildium/angular-docs');
var ghPages = process.argv.indexOf('--gh-pages') !== -1;

buildiumAngularDocs({
    angularVersion: '1.5.9',
    title: 'Buildium : Angular Elements',
    scripts: [
        path.join(__dirname, '../dist/buildium-angular-elements.js')
    ],
    sourceFiles: [
        path.join(__dirname, '../src/**/*.js')
    ],
    destination: path.join(__dirname, '../docs'),
    ghPages: ghPages
});