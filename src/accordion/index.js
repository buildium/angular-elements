const moduleName = 'buildium.angular-elements.accordion';

/**
 * @ngdoc module
 * @name buildium.angular-elements.accordion
 * @module buildium.angular-elements.accordion
 */
angular.module(moduleName, [])
// @ngInject

.component('bdAccordion', require( './accordion.js'))
.component('bdAccordionSection', require( './accordion-section.js'))

.directive('bdAccordionToggle', require('./accordion-toggle.js'))
.directive('bdAccordionGroup', require('./accordion-group.js'));

module.exports = moduleName;
