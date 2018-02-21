const component = {};

/**
  * @ngdoc directive
  * @name bdVerticalNavigation
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @description
  * 
  * A vertical navigation element suitable for sidebar navs
  *
  * @param {Array} [navigationItems] - The collection of navigation items that should be added
  * - <a class="label type-hint type-hint-string">string</a> `title` - <strong>Name to display for this navigation item</strong>
  * - <a class="label type-hint type-hint-boolean">boolean</a> `isEnabled` - Whether user is able to interact with this navigation item 
  * - <a class="label type-hint type-hint-boolean">boolean</a> `isActive` - Whether this navigation item is currrently active (i.e. we are on that page)
  * - <a class="label type-hint type-hint-string">string</a> `href` - Location that this navigation item points to
  * 
  * @example
    <example name="bd-navigation" module="exampleModule">
        <file name="index.html">
            <script>
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
                            isEnabled: true,
                            isActive: true,
                            href: 'https://policies.example.com'
                        },
                        {
                            title: 'Manage',
                            isEnabled: true,
                            isActive: false,
                            href: 'https://manage.example.com'
                        }
                    ]
                })
            </script>

            <div class="page-content" ng-controller="ExampleController as vm">
                <bd-vertical-navigation navigation-items="vm.navItems" class="navigation--large"></bd-vertical-navigation>
            </div>
        </file>
    </example>
  *
  */

component.bindings = {
    navigationItems: '<'
};

component.template = `
<bd-navigation class="navigation--vertical">
    <bd-navigation-item ng-repeat="navigationItem in $ctrl.navigationItems" is-active="navigationItem.isActive">
        <navigation-link>
            <bd-navigation-link>
                <navigation-title>{{navigationItem.title}}</navigation-title>
            </bd-navigation-link>
        </navigation-link>
    </bd-navigation>
</bd-navigation>
`;

module.exports = component;