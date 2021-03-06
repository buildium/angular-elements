const component = {};
const angular = require('angular');

/**
  * @ngdoc component
  * @name bdNavigationLink
  * @module buildium.angular-elements.navigation
  *
  * @param {String} linkHref
  * @param {String} linkSref
  * @param {Boolean} linkDisabled
  * @param (String) template - template to be rendered with $compile using templateScope
  * @param {Object} templateScope - angular scope to be used for compiling template
  *
  * @example
    <example name="bd-navigation-link" module="buildium.angular-elements.navigation">
        <file name="index.html">
            <section class="page-content">
                <bd-navigation>
                    <bd-navigation-item>
                        <bd-navigation-link>
                            <navigation-title>Home</navigation-title>
                        </bd-navigation-link>
                    </bd-navigation-item>
                </bd-navigation>
            </section>
        </file>
    </example>
**/

component.bindings = {
    linkHref: '<?',
    linkSref: '<?',
    linkDisabled: '<?',
    template: '<?',
    templateScope: '<?'
};

component.template = `
    <a class="navigation__item-link" 
        ng-class="{'navigation__item-link--disabled': $ctrl.linkDisabled}"
        ng-click="$ctrl.onClick($event)">

        <div ng-transclude ng-transclude-slot="title" class="navigation__item-title"></div>
    </a>
`;

component.transclude = {
    title: '?navigationTitle'
};

component.require = {
    navigationItem: '^^bdNavigationItem'
};

component.controller = function NavigationLinkController($injector, $window, $element, $compile) {
    const ctrl = this;

    ctrl.$onInit = function onInit() {
        if (ctrl.template && ctrl.templateScope) {
            const insertionElement = angular.element(ctrl.template);
            $element.append(insertionElement);
            $compile(insertionElement)(ctrl.templateScope);
        }
    };

    ctrl.onClick = function onClick(event) {
        if (ctrl.linkDisabled) {
            event.preventDefault();
        } else if (ctrl.linkSref && $injector.has('$state')) {
            $injector.get('$state').go(ctrl.linkSref);
        } else if (ctrl.linkHref) {
            $window.location.assign(ctrl.linkHref);
        }
    };
};

component.controller.$inject = ['$injector', '$window', '$element', '$compile'];

module.exports = component;
