const component = {};

/**
  * @ngdoc component
  * @name bdVerticalNavigation
  * @module buildium.angular-elements.navigation
  * 
  * @description
  * 
  * A vertical navigation element suitable for sidebar navs
  *
  * @param {Array} [navigationItems] - The collection of navigation items that should be added
  * - <a class="label type-hint type-hint-string">string</a> `title` - <strong>Name to display for this navigation item</strong>
  * - <a class="label type-hint type-hint-boolean">boolean</a> `isDisabled` - Whether user is able to interact with this navigation item 
  * - <a class="label type-hint type-hint-boolean">boolean</a> `isActive` - Whether this navigation item is currrently active (i.e. we are on that page)
  * - <a class="label type-hint type-hint-string">string</a> `href` - Location that this navigation item points to
  * - <a class="label type-hint type-hint-string">string</a> `sref` - State that this navigation item points to
  * - <a class="label type-hint type-hint-string">string</a> `cssClass` - Custom class(es) to add to this navigation item
  * - <a class="label type-hint type-hint-array">array</a> `menu` - a sub-navigation with the same collection structure as `navigationItems`
  * 
  * @example
    <example name="bd-navigation" module="exampleModule">
        <file name="index.html">
            <div class="page-content" ng-controller="ExampleController as vm">
                <bd-vertical-navigation navigation-items="vm.navItems" class="navigation--large"></bd-vertical-navigation>
            </div>
        </file>
        <file name="script.js">
            angular.module('exampleModule', ['buildium.angular-elements.navigation'])
            .controller('ExampleController', function () {
                this.navItems = [
                    {
                        title: 'Appearance',
                        isEnabled: true,
                        isActive: false,
                        href: 'https://appearance.example.com'
                    },
                    {
                        title: 'Policies',
                        isActive: true,
                        href: 'https://policies.example.com'
                    },
                    {
                        title: 'Manage',
                        href: 'https://manage.example.com'
                    }
                ]
            })
        </file>
    </example>
  * @example
    <example name="bd-navigation" module="exampleModule">
        <file name="index.html">
            <div class="page-content" ng-controller="ExampleController as vm">
                <bd-vertical-navigation navigation-items="vm.navItems"></bd-vertical-navigation>
            </div>
        </file>
        <file name="script.js">
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
        </file>
    </example>
  *
  */

component.bindings = {
    navigationItems: '<'
};

component.template = `
<bd-navigation class="navigation--vertical">
    <bd-navigation-item ng-repeat="navigationItem in $ctrl.navigationItems" is-active="navigationItem.isActive" is-disabled="navigationItem.isDisabled" class="{{navigationItem.cssClass}}">
        <bd-navigation-link link-href="navigationItem.href" link-disabled="navigationItem.isDisabled" link-sref="navigationItem.sref">
            <navigation-title>{{navigationItem.title}}</navigation-title>
        </bd-navigation-link>
        <navigation-menu class="navigation__menu" ng-if="navigationItem.menu" ng-class="{{$ctrl.getMenuClassName(navigationItem.title)}}">
            <bd-vertical-navigation navigation-items="navigationItem.menu"></bd-vertical-navigation>
        </navigation-menu>
    </bd-navigation>
</bd-navigation>
`;

component.controller = function VerticalNavigationController() {
    const ctrl = this;

    function sanitizeString(string) {
        return string.toLowerCase().replace(/\W/g, '');
    }

    ctrl.getMenuClassName = function getMenuClassName(title) {
        return `navigation__menu--${sanitizeString(title)}`;
    };
};

module.exports = component;
