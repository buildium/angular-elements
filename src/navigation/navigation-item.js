const component = {};

/**
  * @ngdoc directive
  * @name bdNavigationItem
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @example
    <example name="bd-navigation" module="buildium.angular-elements.navigation">
        <file name="index.html">
            <div class="page-content">
                <bd-navigation>
                    <bd-navigation-item>
                        <navigation-link>
                            <bd-navigation-link>
                                <navigation-title>Settings</navigation-title>
                            </bd-navigation-link>
                        </navigation-link>
                        <navigation-menu>
                            <bd-navigation>
                                <bd-navigation-item>
                                    <navigation-link>
                                        <bd-navigation-link>
                                            <navigation-title>Billing</navigation-title>
                                        </bd-navigation-link>
                                    </navigation-link>
                                </bd-navigation-item>
                            </bd-navigation>
                        </navigation-menu>
                    </bd-navigation-item>
                </bd-navigation>
            </div>
        </file>
    </example>
  *
  */

component.template = `
<div class="navigation__item" bd-accordion-toggle>
    <div ng-transclude ng-transclude-slot="link" class="js-accordion-toggle"></div>
    <div bd-accordion-group>
        <ng-transclude ng-transclude-slot="menu"></ng-transclude>
    </div>
    <ng-transclude></ng-transclude>
</div>
`;

component.transclude = {
    link: '?navigationLink',
    menu: '?navigationMenu'
};

component.require = {
    navigation: '^^bdNavigation'
};

module.exports = component;