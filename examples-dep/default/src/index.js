(function(angular) {
  'use strict';
'use strict';

/**
 * @ngdoc overview
 * @name index
 * @area api
 * @description Module Overview
 */
let moduleName = 'buildium.angular-elements';

/**
 * @ndgoc module
 * @name buildium.angular-elements
 * @module buildium.angular-elements
 */
angular.module(moduleName, [
    require('./popover'),
    require('./media-gallery')
]);

module.exports = moduleName;

})(window.angular);