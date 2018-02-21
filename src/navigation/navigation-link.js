const component = {};

/**
  * @ngdoc directive
  * @name bdNavigationLink
  * @module buildium.angular-elements.navigation
  * @restrict E
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

component.template = `
    <a class="navigation__item-link">
        <div ng-transclude ng-transclude-slot="title" class="navigation__item-title"></div>
    </a>
`;

component.transclude = {
    title: '?navigationTitle'
};

component.require = {
    navigationItem: '^^bdNavigationItem'
};

module.exports = component;