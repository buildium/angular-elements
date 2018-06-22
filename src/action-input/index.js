const moduleName = 'buildium.angular-elements.action-input';

/**
 * @ngdoc module
 * @name buildium.angular-elements.action-input
 * @module buildium.angular-elements.action-input
 */
angular.module(moduleName, [
    require('../popover')
])

.component('bdActionInput', require('./action-input.js'));

module.exports = moduleName;
