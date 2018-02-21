const moduleName = 'buildium.angular-elements.navigation';

/**
 * @ngdoc module
 * @name buildium.angular-elements.navigation
 * @module buildium.angular-elements.navigation
 */
angular.module(moduleName, [
    require('../accordion')
])

.component('bdNavigation', require('./navigation'))
.component('bdNavigationItem', require('./navigation-item'))
.component('bdNavigationLink', require('./navigation-link'))
.component('bdVerticalNavigation', require('./vertical-navigation'));

module.exports = moduleName;