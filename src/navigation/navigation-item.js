const component = {};

/**
  * @ngdoc directive
  * @name bdNavigationItem
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @param {Boolean} isActive
  * @param {Boolean} isDisabled
  * @param {Boolean} hasSubMenu
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
    hasSubMenu: '<?'
};

component.template = `
<div ng-if="$ctrl.hasSubMenu"
    class="navigation__item"
    ng-class="{'navigation__item--active': $ctrl.isActive, 'navigation__item--disabled': $ctrl.isDisabled}"
    bd-accordion-toggle
    disabled="$ctrl.isDisabled"
    is-open="$ctrl.isActive"
    on-change="$ctrl.onAccordionToggleChange(isAccordionGroupOpen)">

    <ng-transclude></ng-transclude>
    <div bd-accordion-group ng-transclude ng-transclude-slot="menu"></div>
</div>
<div ng-if="!$ctrl.hasSubMenu" 
    class="navigation__item" 
    ng-class="{'navigation__item--active': $ctrl.isActive, 'navigation__item--disabled': $ctrl.isDisabled}" 
    ng-transclude>
</div>
`;

component.transclude = {
    menu: '?navigationMenu'
};

component.require = {
    navigation: '^^bdNavigation'
};

component.controller = function NavigationItemController($attrs, $transclude) {
    const ctrl = this;

    ctrl.$onInit = function onInit() {
        const subMenuOptionNotProvided = !('hasSubMenu' in $attrs);
        if (subMenuOptionNotProvided) {
            ctrl.hasSubMenu = $transclude.isSlotFilled('menu');
        }
    };

    ctrl.onAccordionToggleChange = function onAccordionToggleChange(isAccordionGroupOpen) {
        ctrl.isActive = isAccordionGroupOpen;
    };
};

component.controller.$inject = ['$attrs', '$transclude'];

module.exports = component;
