const component = {};

/**
  * @ngdoc component
  * @name bdNavigation
  * @module buildium.angular-elements.navigation
  * 
  * @description
  * 
  * A flexible component for building all types of navigation elements. 
  * CSS classes are generously added throughout to enable style overrides 
  * for horizontal, tabbed, or vertical navigation bars.
  * 
  * @example
    <example name="bd-navigation" module="buildium.angular-elements.navigation">
        <file name="index.html">
            <div class="page-content">
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

component.template = '<bd-accordion single-section-only="true"><nav class="navigation" ng-transclude></nav></bd-accordion>';

component.transclude = true;

module.exports = component;
