const component = {};

/**
  * @ngdoc directive
  * @name bdNavigationLink
  * @module buildium.angular-elements.navigation
  * @restrict E
  * 
  * @param {String} linkHref
  * @param {Boolean} linkDisabled
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
    linkDisabled: '<?'
};

component.template = `
    <a class="navigation__item-link" 
        ng-class="{'navigation__item-link--disabled': $ctrl.linkDisabled}"
        ng-href="{{$ctrl.linkHref}}" 
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

component.controller = function NavigationLinkController() {
    const ctrl = this;

    ctrl.onClick = function onClick(event) {
        if (ctrl.linkDisabled) {
            event.preventDefault();
        }
    };
};

module.exports = component;