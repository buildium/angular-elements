(function(angular) {
  'use strict';
'use strict';

let moduleName = 'buildium.angular-ui';

/**
 * @ndgoc module
 * @name angular-ui
 * @module angular-ui
 */
angular.module(moduleName, [
    require('./src/compile-dynamic-html'),
    require('./src/scroll-into-view'),
    require('./src/event'),
    require('./src/copy-to-clipboard'),
    require('./src/loading-src'),
    require('./src/compile-template')
]);

module.exports = moduleName;

})(window.angular);