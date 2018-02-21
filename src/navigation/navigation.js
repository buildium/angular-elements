const component = {};

/**
  * @ngdoc directive
  * @name bdNavigation
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @description
  * 
  * A flexible component for building all types of navigation elements. 
  * CSS classes are generously added throughout to enable style overrides 
  * for horizontal, tabbed, or vertical navigation bars.
  *
  * @param {Array} [navItems] - The collection of navigation items that should be added
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
                            title: 'Example',
                            isEnabled: true,
                            isActive: true,
                            href: 'https://example.com'
                        },
                        {
                            title: 'Secure Example',
                            isEnabled: true,
                            isActive: false,
                            href: 'https://example.com'
                        }
                    ]
                })
            </script>

            <div class="page-content" ng-controller="ExampleController as vm">
                <bd-navigation>
                    <bd-navigation-item>
                        <bd-navigation-link>
                            <navigation-title>Home</navigation-title>
                        </bd-navigation-link>
                    </bd-navigation-item>
                    <bd-navigation-item>
                        <bd-navigation-link>
                            <navigation-title>Settings</navigation-title>
                        </bd-navigation-link>
                        <bd-navigation-menu>
                            <bd-navigation>
                                <bd-navigation-item>
                                    <bd-navigation-link>
                                        <navigation-title>Billing</navigation-title>
                                    </bd-navigation-link>
                                </bd-navigation-item>
                            </bd-navigation>
                        </bd-navigation-menu>
                    </bd-navigation-item>
                    <bd-navigation-item>
                        <bd-navigation-link>
                            <navigation-title>About</navigation-title>
                        </bd-navigation-link>
                    </bd-navigation-item>
                </bd-navigation>
            </div>
        </file>
    </example>
  *
  */

component.template = `
<bd-accordion>
    <nav class="navigation" ng-transclude></nav>
</bd-accordion>
`;

component.transclude = true;

module.exports = component;