/**
 * @ngdoc overview
 * @name index
 * @description
 * 
 * # Buildium Angular Elements Library
 * 
 * > A companion library of bespoke custom elements built by Buildium for use with AngularJS applications
 * 
 * ## Installation
 * 
 * ```
 * npm install @buildium/angular-elements
 * ```
 * 
 * ## Using elements from the library
 * 
 * Gain access to all the elements in this library by including the file distributed with this package 
 * 
 * ```html
 * <body ng-app="app">
 *  <script src="@buildium/angular-elements/dist/buildium-angular-elements.js"></script>
 *  <script>
 *      angular.module('app', ['buildium.angular-elements'])
 *  </script>
 * </body>
 * ```
 * 
 * It can also be imported by any `require`-compatible module bundler, such as 
 * [webpack](https://webpack.js.org/) or [browserify](https://browserify.org/)
 * 
 * ```html
 * <body ng-app="app">
 *  <script>
 *      angular.module('app', [
 *          require('@buildium/angular-elements')
 *      ])
 *  </script>
 * </body>
 * ```
 * 
 * Or, import individual elements
 * 
 * ```html
 * <body ng-app="app">
 *  <script>
 *      angular.module('app', [
 *          require('@buildium/angular-elements/lib/popover')
 *      ])
 *  </script>
 * </body>
 * ```
 * 
 * ## Element styles
 * 
 * The elements in this package are unstyled for easier integration into existing applications.
 * 
 * For a default set of styles, the Buildium theme library can be installed alongside this package
 * 
 * ```
 * npm install @buildium/theme
 * ```
 * 
 * and the distributed file included with your application's styles
 * 
 * ```
 * <link rel="stylesheet" href="@buildium/theme/dist/theme-styles.css">
 * ```
 */
const moduleName = 'buildium.angular-elements';

/**
 * @ndgoc module
 * @name buildium.angular-elements
 * @module buildium.angular-elements
 */
angular.module(moduleName, [
    require('./popover'),
    require('./media-gallery'),
    require('./accordion'),
    require('./navigation')
]);

module.exports = moduleName;
