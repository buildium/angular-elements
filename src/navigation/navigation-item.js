const component = {};

/**
  * @ngdoc directive
  * @name bdNavigationItem
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @param {Boolean} isActive
  * @param {Boolean} isDisabled
  * @param {Function} onToggle  called when navigation item is opened or closed
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
    isDisabled: '<?',
    onToggle: '&?'
};

component.template = `
<div bd-accordion-toggle 
    disabled="$ctrl.isDisabled"
    is-open="$ctrl.isOpen"
    on-change="$ctrl.onAccordionToggleChange(isAccordionGroupOpen)"
    class="navigation__item"
    ng-class="{
        'navigation__item--active': $ctrl.isActive, 
        'navigation__item--open': $ctrl.isOpen, 
        'navigation__item--disabled': $ctrl.isDisabled}">

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

    ctrl.$onInit = function onInit() {
        ctrl.isOpen = ctrl.isActive;
    };

    ctrl.onAccordionToggleChange = function onAccordionToggleChange(isAccordionGroupOpen) {
        ctrl.isOpen = isAccordionGroupOpen;

        if (ctrl.onToggle) {
            ctrl.onToggle({ isActive: isAccordionGroupOpen });
        } else {
            ctrl.isActive = isAccordionGroupOpen;
        }
    };
};

module.exports = component;
