(function(angular) {
  'use strict';
angular.module('exampleModule', ['buildium.angular-elements.navigation'])
.controller('ExampleController', function () {
    this.navItems = [
        {
            title: 'Appearance',
            href: '#appearance',
            menu: [
                {
                    title: 'Branding'
                },
                
                {
                    title: 'Logos'
                },
                {
                    title: 'Profile photos'
                },
                {
                    title: 'Domain'
                }
            ]
        },
        {
            title: 'Policies',
            isActive: true,
            href: '#policies',
            menu: [
                {
                    title: 'Frequency'
                },
                {
                    title: 'Period'
                },
                {
                    title: 'Rules'
                },
                {
                    title: 'Fees'
                },
                {
                    title: 'Notifications'
                }
            ]
        },
        {
            title: 'Management',
            isDisabled: true,
            href: '#management',
            menu: [
                {
                    title: 'Type'
                },
                {
                    title: 'Income'
                },
                {
                    title: 'Summary'
                }
            ]
        }
    ]
})
})(window.angular);