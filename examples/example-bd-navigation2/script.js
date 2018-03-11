(function(angular) {
  'use strict';
angular.module('exampleModule', ['buildium.angular-elements.navigation'])
.controller('ExampleController', function () {
    this.navItems = [
        {
            title: 'Appearance',
            isDisabled: true,
            isActive: false,
            href: '#https://appearance.example.com'
        },
        {
            title: 'Policies',
            isActive: true,
            href: '#https://policies.example.com'
        },
        {
            title: 'Manage',
            href: '#https://manage.example.com'
        }
    ]
})
})(window.angular);