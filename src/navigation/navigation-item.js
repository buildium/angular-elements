const component = {};

/**
  * @ngdoc component
  * @name bdNavigationItem
  * @module buildium.angular-elements.navigation
  * 
  * @param {Boolean} isActive
  * @param {Boolean} isDisabled
  * 
  * @example
    <example name="bd-navigation" module="buildium.angular-elements.navigation">
        <file name="index.html">
            <div class="page-content">
                <bd-navigation>
                    <bd-navigation-item>
                        <bd-navigation-link>
                            <navigation-title>Settings</navigation-title>
                        </bd-navigation-link>
                        <navigation-menu>
                            <bd-navigation>
                                <bd-navigation-item>
                                    <bd-navigation-link>
                                        <navigation-title>Billing</navigation-title>
                                    </bd-navigation-link>
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

component.bindings = {
    isActive: '<?',
    isDisabled: '<?'
};

component.template = `
<div bd-accordion-toggle 
    disabled="$ctrl.isDisabled"
    is-open="$ctrl.isActive"
    on-change="$ctrl.onAccordionToggleChange(isAccordionGroupOpen)"
    class="navigation__item"
    ng-class="{'navigation__item--active': $ctrl.isActive, 'navigation__item--disabled': $ctrl.isDisabled}">

    <ng-transclude></ng-transclude>
    <div bd-accordion-group ng-transclude ng-transclude-slot="menu"></div>
</div>
`;

component.transclude = {
    menu: '?navigationMenu'
};

component.require = {
    navigation: '^^bdNavigation'
};

component.controller = function NavigationItemController() {
    const ctrl = this;

    ctrl.onAccordionToggleChange = function onAccordionToggleChange(isAccordionGroupOpen) {
        ctrl.isActive = isAccordionGroupOpen;
    };
};

module.exports = component;
