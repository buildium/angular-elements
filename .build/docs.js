#!/usr/bin/env node

var path = require('path'),
    glob = require('glob'),
    buildiumAngularDocs = require('@buildium/angular-docs'),
    ghPages = process.argv.indexOf('--gh-pages') !== -1,
    buildiumThemeFiles = glob.sync(path.join(__dirname, '../node_modules/@buildium/theme/dist/**/*'), {nodir: true}),
    styles = ['https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'].concat(buildiumThemeFiles);

buildiumAngularDocs({
    angularVersion: '1.5.9',
    title: 'Buildium : Angular Elements',
    scripts: [
        path.join(__dirname, '../dist/buildium-angular-elements.js')
    ],
    sourceFiles: [
        path.join(__dirname, '../src/**/*.js')
    ],
    stylesheets: styles,
    destination: path.join(__dirname, '../docs'),
    ghPages: ghPages
});

